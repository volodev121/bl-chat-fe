import React, { FC, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import useStyles from "./styles.tsx";
import Header from "./header.tsx";
import { MessageType, Config, QuestionTimelineRadiogroupElement } from "./../utils/types.tsx";
import Footer from './footer.tsx'
import MessageOverview from "./messageOverview";
import MessageList from "./messageList";
import {mockMessagesList} from './../utils/mocks.tsx'

interface ChatWidgetProps {
  setShowChatWidget: (flag: boolean) => void;
  setShowToolTip: (flag: boolean) => void;
  config: Config;
  apiClient: Object;
}

const ChatWidget: FC<ChatWidgetProps> = ({
  setShowChatWidget,
  setShowToolTip,
  config,
  apiClient,
}) => {
  const messagesFromConfig = (config: Config) => {
    const timeline = config.question_timeline;
    if (!timeline) {
      return mockMessageList;
    }
    const list = timeline.elements;
    if (!list) {
      return mockMessageList;
    }
    return list.map((item: QuestionTimelineRadiogroupElement) => {
      return {
        key: item.name, 
        title: item.title, 
        content: "", 
        role: "bot", 
        completed: false, 
        element: item, 
        surveyQuestion: true,
        time: (new Date()).toISOString(),
      }
    });
  };
  const styles = useStyles();
  const messageTemplates = messagesFromConfig(config);
  const [messages, setMessages] = useState<Array<MessageType>>(messageTemplates.slice(0,1));
  useEffect(() => {
    apiClient.updateHistory(messages)
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
  const storeTimeLineMessages = (message: MessageType) => {
    setMessages((messages) => {
      let tempMessages = messages;
      // TODO: check if message has a survey question attached to it and mark the question as completed
      if (message.surveyQuestion) {
        tempMessages = tempMessages.map((msg) => {
          if(msg.key == message.name) { 
            msg.completed = true; 
            msg.disabled = true; 
            msg.content = message.content; 
            return msg
          } else {
            return msg
          }
        })
      }
      tempMessages = [...tempMessages, message]
      // then add the new message
      // should all survey bot message be completed, check if messageTemplates has a new message and add it to the set
      const newMessageTemplate = tempMessages.filter((tmp) => tmp.surveyQuestion && tmp.role == "bot").some((tmp) => !tmp.completed )
      if (!newMessageTemplate) {
        const remainingTemplates = messageTemplates.filter((template) => !tempMessages.some((msg) => msg.key == template.key))
        if (remainingTemplates.length) {
          const newMessage = { ...remainingTemplates[0], time: (new Date()).toISOString() }
          tempMessages = [...tempMessages, newMessage]
        }
      }
      // should the message be marked as a custom input, send it's content to the chat service and add a loading element to the list
      if (message.customInput && message.role == "user") {
        // dispatch api call
        const loadingKey = Date.now();
        apiClient.chat(tempMessages).then(updateMessageFactory(loadingKey));
        const loadingMessage = {
          key: loadingKey,
          role: "bot",
          content: "thinking...",
          time: (new Date()).toISOString(),
        };
        tempMessages = [...tempMessages,loadingMessage]
      }
      return [...tempMessages]
    });
  }
  const [message, setMessage] = useState<MessageType>({ role: 'user', content: '', customInput: true });

  return (
    <>
      <style >
        {`
          html { overflow: hidden; height: 100vh; scroll-padding: 0 }
          body { overflow: hidden }
        `}
      </style>
      <Grid container sx={{ display: 'grid' }}
            className={styles.chatWidget}>
        <Header
          setShowChatWidget={setShowChatWidget}
          setShowToolTip={setShowToolTip}
          iconUrl={config.icon_url}
        />
        <MessageOverview messages={messages} />
        <MessageList messages={messages} storeTimeLineMessages={storeTimeLineMessages} />
        <Footer
          storeTimeLineMessages={storeTimeLineMessages}
            setMessage={setMessage}
          />
      </Grid>
    </>
  );
};

export default ChatWidget;
