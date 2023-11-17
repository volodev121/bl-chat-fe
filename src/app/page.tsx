"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createRoot } from "react-dom/client";
import ToolTip from "./components/toolTip.tsx";
import { getToken } from "./utils/authorization.tsx";
import { getConfig } from "./utils/authorization.tsx";
import ChatWidget from "./components/chatWidget.tsx";
import customThemeFactory from "./utils/customThemeFactory.tsx";
import { mockMessagesList } from "./utils/mocks.tsx";
import {
  MessageType,
  Config,
  QuestionTimelineRadiogroupElement,
} from "./utils/types.tsx";
import createApiClient from "./utils/apiClient.tsx";
import ApiClientContext from "./components/apiContext.tsx";
import ConfigContext from "./components/configContext.tsx";

import useStyles from "./components/styles.tsx";
import { time } from "console";

export default function App({ baseUrl }) {
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [showToolTip, setShowToolTip] = useState(true);
  const config = {
    logo_url: "",
  };
  const [hasConfig, setHasConfig] = useState(false);
  const [fetchedConfig, setFetchedConfig] = useState<any>(config);

  const [apiClient, setApiClient] = useState<any>(null);
  const [inputValue, setInputValue] = useState("");
  const styles = useStyles();

  const handleChange = (event: any) => {
    const value = event.target.value;
    setInputValue(value);
    setShowChatWidget(value !== "");
    setShowToolTip(value === "");
  };

  const messagesFromConfig = (config: Config) => {
    const timeline = config.question_timeline;
    if (!timeline) {
      return mockMessagesList;
    }
    const list = timeline.elements;
    if (!list) {
      return mockMessagesList;
    }
    return list.map((item: QuestionTimelineRadiogroupElement) => {
      return {
        key: item.name,
        title: item.title,
        content: item.description || "",
        role: "bot",
        completed: item.type == "image" || (item.type == "expression" && !item.expression),
        element: item,
        surveyQuestion: true,
        time: new Date().toISOString(),
      };
    });
  };

  const initialMessages = (templates) => {
    let firstUnansweredIndex = templates.findIndex((msg) => !msg.completed)
    if (firstUnansweredIndex == -1) firstUnansweredIndex = templates.length
    return templates.slice(0, firstUnansweredIndex + 1);
  };

  const [messageTemplates, setMessageTemplates] = useState<Array<MessageType>>(
    messagesFromConfig(fetchedConfig)
  );
  const [timeline, setTimeline] = useState<Array<MessageType>>(
    messageTemplates.filter((msg) => !!msg.title)
  );
  const [surveyData, setSurveyData] = useState({});
  const [messages, setMessages] = useState<Array<MessageType>>(
    messageTemplates
  );

  useEffect(
    () => {
      let initialMsgs = initialMessages(messageTemplates)
      const lastMsg = initialMsgs[initialMsgs.length - 1]

      // if the last uncompleted template message is an expression, we need to automatically call the chat API to fake a user input
      if (!lastMsg.completed && lastMsg.element && lastMsg.element.type == 'expression') {
        initialMsgs = [...initialMsgs, handleExpressionExecution(initialMsgs, lastMsg)]
      }
      setMessages((messages) => [
        ...initialMsgs
      ]);
      setTimeline(initialMsgs.filter((msg) => !!msg.title))
    },
    [messageTemplates]
  );


  const updateSurveyDataFuction = (messages) => {
    return (surveyData) =>
      messages
        .filter((msg) => msg.role == "user" && msg.surveyQuestion)
        .reduce((data, msg) => {
          data[msg.name] = msg.content;
          return data;
        }, {});
  };

  useEffect(() => {
    apiClient?.updateHistory(messages);
    setTimeline((timeline) => {
      timeline = timeline.map((timelineItem) => {
        const msg = messages.find((msg) => msg.key == timelineItem.key);
        if (msg) {
          return msg;
        }
        return timelineItem;
      });
      return timeline;
    });
  }, [messages]);

  useEffect(() => {
    setSurveyData(updateSurveyDataFuction(messages));
  }, [messages]);

  const updateMessageFactory = function (key) {
    return (content) => {
      setMessages((messages) => {
        console.log(content, messages);
        messages = messages.map((msg) => {
          if (msg.key == key) {
            return { ...msg, ...content, time: new Date().toISOString() };
          } else {
            return msg;
          }
        });
        return [...messages];
      });
    };
  };

  const handleExpressionExecution = function(tempMessages, newMessage) {
    // generate latest surveyData, we will need it in the code below. Otherwise the last answer is null.
    const tempSurveyData = updateSurveyDataFuction(tempMessages)();
    const loadingKey = Date.now();
    const fakeUserMessage = {
      key: `${loadingKey}-fake-input`,
      role: "user",
      content: newMessage.element.expression.replaceAll(
        /\{([a-z0-9A-Z]+)\}/gm,
        (match, group) => tempSurveyData[group]
      ),
      time: new Date().toISOString(),
    };
    apiClient
      ?.chat([...tempMessages, fakeUserMessage])
      .then(updateMessageFactory(loadingKey))
      .then(() => updateMessageFactory(newMessage.key)({completed: true}));
    const loadingMessage = {
      key: loadingKey,
      role: "bot",
      content: "thinking...",
      time: new Date().toISOString(),
    };
    return loadingMessage;
  }

  const insertNextSurveyQuestion = function (tempMessages: any) {
    const newMessageTemplate = tempMessages
      .filter((tmp: any) => tmp.surveyQuestion && tmp.role == "bot")
      .some((tmp: any) => !tmp.completed);
    if (!newMessageTemplate) {
      const remainingTemplates = messageTemplates.filter(
        (template) => !tempMessages.some((msg) => msg.key == template.key)
      );
      if (remainingTemplates.length) {
        const newMessage = {
          ...remainingTemplates[0],
          time: new Date().toISOString(),
        };
        tempMessages = [...tempMessages, newMessage];
        console.log(newMessage);
        if (
          newMessage.element.type == "expression" &&
          newMessage.element.expression
        ) {
          tempMessages = [...tempMessages, handleExpressionExecution(tempMessages, newMessage)];
        }
      }
    }
    return tempMessages;
  };

  const storeTimeLineMessages = (message: MessageType) => {
    setMessages((messages) => {
      let tempMessages = messages;
      // TODO: check if message has a survey question attached to it and mark the question as completed
      if (message.surveyQuestion) {
        tempMessages = tempMessages.map((msg) => {
          if (msg.key == message.name) {
            msg.completed = true;
            msg.content = message.content;
            return msg;
          } else {
            return msg;
          }
        });
      }
      message.completed = true;
      tempMessages = [...tempMessages, message];

      // then add the new message
      // should all survey bot message be completed, check if messageTemplates has a new message and add it to the set
      tempMessages = insertNextSurveyQuestion(tempMessages);
      // should the message be marked as a custom input, send it's content to the chat service and add a loading element to the list
      if (message.customInput && message.role == "user") {
        // dispatch api call
        const loadingKey = Date.now();
        apiClient?.chat(tempMessages).then(updateMessageFactory(loadingKey));
        const loadingMessage = {
          key: loadingKey,
          role: "bot",
          content: "thinking...",
          time: new Date().toISOString(),
        };
        tempMessages = [...tempMessages, loadingMessage];
      }
      return [...tempMessages];
    });
  };

  const handleSubmit = () => {
    if (!inputValue) return;

    const msg = {
      key: `${Date.now()}-user`,
      role: "user",
      content: inputValue,
      customInput: true,
      time: new Date().toISOString(),
    };
    storeTimeLineMessages(msg);
    setInputValue("");
  };

  useEffect(() => {
    const fetchConfig = async () => {
      const authResponse = await getToken({});

      if (authResponse.status === 200) {
        const headers = {
          headers: {
            Authorization: authResponse.data.auth_token,
          },
        };

        setApiClient(createApiClient(authResponse.data.auth_token));
        const configResponse = await getConfig({}, headers);
        if (configResponse.status === 200) {
          setFetchedConfig(configResponse.data);
          setMessageTemplates(messagesFromConfig(configResponse.data));
          console.log(configResponse.data)
          setTimeline(
            // only take completed messages
            messagesFromConfig(configResponse.data).filter((msg) => msg.completed)
          );

          // only take first two msg
          setTimeline(timeLine => timeLine.slice(0, 1))
          setHasConfig(true);
        } else {
          console.error("Failed to fetch config:", configResponse.data);
        }
      } else {
        console.error("Failed to authenticate:", authResponse.data);
      }
    };

    fetchConfig();
  }, []);

  // don't show the chat widget until we have the config
  if (!hasConfig) {
    return <></>;
  }

  const classNames = `${styles.chatWidget} ${showChatWidget ? styles.show : ""}`
  const classNamesTooltip = `${styles.toolTip} ${!showToolTip ? styles.show2 : ""}`

  return (
    <ConfigContext.Provider value={fetchedConfig}>
      <ApiClientContext.Provider value={apiClient}>
        <ThemeProvider theme={customThemeFactory(fetchedConfig)}>
            <ToolTip
              classNames={classNamesTooltip}
              showToolTip={showToolTip}
              handleChange={handleChange}
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSubmit={handleSubmit}
              setShowChatWidget={setShowChatWidget}
              setShowToolTip={setShowToolTip}
            />
            <ChatWidget
              classNames={classNames}
              messageTemplates={messageTemplates}
              setShowChatWidget={setShowChatWidget}
              setShowToolTip={setShowToolTip}
              messages={messages}
              setMessages={setMessages}
              storeTimeLineMessages={storeTimeLineMessages}
              timeline={timeline}
              baseUrl={baseUrl}
              updateMessageFactory={updateMessageFactory}
            />
          </ThemeProvider>
      </ApiClientContext.Provider>
    </ConfigContext.Provider>
  );
}

// make the component available for the window
if (document != null) {
  const baseUrl = (() => {
    const scriptUrl = document.currentScript.src;
    return scriptUrl.slice(0,scriptUrl.lastIndexOf('/'))
  })();
  const navDomNode = document.querySelector("#bl-chat-widget-bubble-button");
  if (navDomNode != null) {
    const navRoot = createRoot(navDomNode);
    navRoot.render(<App baseUrl={baseUrl} />);
  }
}
