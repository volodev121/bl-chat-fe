"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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

import useStyles from "./components/styles.tsx";

export default function App() {
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [showToolTip, setShowToolTip] = useState(true);
  const config = {
    logo_url: "",
  };
  const [hasConfig, setHasConfig] = useState(false);
  const [fetchedConfig, setFetchedConfig] = useState<any>(config);
  const [fetchedToken, setFetchedToken] = useState<any>("");

  const [apiClient, setApiClient] = useState<any>(null);
  const [inputValue, setInputValue] = useState("");
  const styles = useStyles();

  const handleChange = (event: any) => {
    const value = event.target.value;
    setInputValue(value);
    setShowChatWidget(value !== "");
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
        completed: item.type == "image" || item.type == "expression",
        element: item,
        surveyQuestion: true,
        time: new Date().toISOString(),
      };
    });
  };

  const initialMessages = (templates) => {
    return templates.slice(
      0,
      templates.findIndex((msg) => !msg.completed) + 1
    )
  }

  const [messageTemplates, setMessageTemplates] = useState<Array<MessageType>>(messagesFromConfig(fetchedConfig))
  const [timeline, setTimeline] = useState<Array<MessageType>>(messageTemplates.filter((msg) => !!msg.title));
  const [surveyData, setSurveyData] = useState({});
  const [messages, setMessages] = useState<Array<MessageType>>(initialMessages(messageTemplates));

  useEffect(() =>
    setMessages((messages) =>
      [...messages, ...initialMessages(messageTemplates)]
    ),
    [messageTemplates]
  )

  const updateSurveyDataFuction = (messages) => {
    return (surveyData) => messages.filter((msg) => msg.role == "user" && msg.surveyQuestion).reduce((data, msg) => { data[msg.name] = msg.content; return data; }, {})
  };

  useEffect(() => {
    apiClient?.updateHistory(messages);
    setTimeline((timeline) => {
      timeline = timeline.map((timelineItem) => {
        const msg = messages.find((msg) => msg.key == timelineItem.key)
        if (msg) {
          return msg
        }
        return timelineItem
      });
      return timeline
    });
  }, [messages])

  useEffect(() => {
    setSurveyData(updateSurveyDataFuction(messages))
  }, [messages])

  const updateMessageFactory = function(key) {
    return (content) => {
      setMessages((messages) => {
        console.log(content, messages);
        messages = messages.map((msg) => {
          if (msg.key == key) {
            return { ...msg, ...content, time: (new Date()).toISOString() };
          } else {
            return msg;
          }
        });
        return [...messages];
      })
    }
  }

  const insertNextSurveyQuestion = function(tempMessages: any) {
    const newMessageTemplate = tempMessages.filter((tmp: any) => tmp.surveyQuestion && tmp.role == "bot").some((tmp: any) => !tmp.completed )
    if (!newMessageTemplate) {
      const remainingTemplates = messageTemplates.filter((template) => !tempMessages.some((msg) => msg.key == template.key))
      if (remainingTemplates.length) {
        const newMessage = { ...remainingTemplates[0], time: (new Date()).toISOString() }
        tempMessages = [...tempMessages, newMessage]
        console.log(newMessage)
        if (newMessage.element.type == "expression" && newMessage.element.expression) {
          // generate latest surveyData, we will need it in the code below. Otherwise the last answer is null.
          const tempSurveyData = updateSurveyDataFuction(tempMessages)()
          const loadingKey = Date.now();
          const fakeUserMessage = {
            key: `${loadingKey}-fake-input`,
            role: "user",
            content: newMessage.element.expression.replaceAll(/\{([a-z0-9A-Z]+)\}/gm, (match, group) => tempSurveyData[group]),
            time: (new Date()).toISOString(),
          };
          apiClient?.chat([...tempMessages, fakeUserMessage]).then(updateMessageFactory(loadingKey));
          const loadingMessage = {
            key: loadingKey,
            role: "bot",
            content: "thinking...",
            time: (new Date()).toISOString(),
          };
          tempMessages = [...tempMessages,loadingMessage]
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
            msg.disabled = true;
            msg.content = message.content;
            return msg;
          } else {
            return msg;
          }
        });
      }
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

        setFetchedToken(authResponse.data.auth_token);
        setApiClient(createApiClient(authResponse.data.auth_token));
        const configResponse = await getConfig({}, headers);
        if (configResponse.status === 200) {
          setFetchedConfig(configResponse.data);
          setMessageTemplates(messagesFromConfig(configResponse.data));
          setTimeline(messagesFromConfig(configResponse.data).filter((msg) => !!msg.title))
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

  return (
    <ThemeProvider theme={customThemeFactory(fetchedConfig)}>
      {showToolTip ? (
        <ToolTip
          handleChange={handleChange}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSubmit={handleSubmit}
          setShowChatWidget={setShowChatWidget}
          setShowToolTip={setShowToolTip}
          config={fetchedConfig}
        />
      ) : (
        <></>
      )}
      {
        <div
          className={`${styles.chatWidget} ${
            showChatWidget ? styles.show : ""
          }`}
        >
          <ChatWidget
            messageTemplates={messageTemplates}
            setShowChatWidget={setShowChatWidget}
            setShowToolTip={setShowToolTip}
            messages={messages}
            setMessages={setMessages}
            storeTimeLineMessages={storeTimeLineMessages}
            config={fetchedConfig}
            timeline={timeline}
          />
        </div>
      }
    </ThemeProvider>
  );
}

// make the component available for the window
if (document != null) {
  const navDomNode = document.querySelector("#bl-chat-widget-bubble-button");
  if (navDomNode != null) {
    const navRoot = createRoot(navDomNode);
    navRoot.render(<App />);
  }
}
