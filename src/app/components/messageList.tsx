import React, { useEffect, useRef } from "react";
import { List } from "@mui/material";
import useStyles from "./styles";
import { MessageType } from "./../utils/types.tsx";
import MessageBot from "./messageBot.tsx";
import { useState } from "react";
import UserMessage from "./messageUser.tsx";

interface MessageListProps {
  messages: Array<MessageType>;
  storeTimeLineMessages: (message: MessageType) => void;
  updateMessageFactory: (key: string) => (message: MessageType) => void;
  iconUrl: string;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  storeTimeLineMessages,
  updateMessageFactory,
  iconUrl
}) => {
  const styles = useStyles();
  const [selectedValue, setSelectedValue] = useState("");
  const [elementDisabled, setElementDisabled] = useState(true);

  const bottomRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleChange = (message: MessageType, label: string) => {
    if (!message.completed) {
      setSelectedValue(label);
      setElementDisabled(false);
    }
  };

  const handleClick = (message: MessageType) => {
    const msg = {
      ...message, // extend original message for back reference to the question
      key: `${message.key} answer`,
      role: "user",
      content: selectedValue,
      completed: true,
      disabled: true,
      name: message.key,
      customInput: false,
      surveyQuestion: message.surveyQuestion,
      time: (new Date()).toISOString(),
    };
    storeTimeLineMessages(msg);
    setElementDisabled(true);
  };

  return (
    <>
      <List className={styles.chatWidgetMessageList}>
        {messages.map((message, index) =>
          (() => {
            if (message.role === "bot" && message.default) {
              return (
                <MessageBot
                  key={index}
                  message={message}
                  ratingAvailable={false}
                  elementDisabled={elementDisabled}
                  updateSelf={updateMessageFactory(message.key)}
                  handleChange={handleChange}
                  handleClick={handleClick}
                />
              );
            } else if (message.role === "bot") {
              return (
                <MessageBot
                  message={message}
                  ratingAvailable={false}
                  elementDisabled={elementDisabled}
                  imgSource={iconUrl}
                  updateSelf={updateMessageFactory(message.key)}
                  handleChange={handleChange}
                  handleClick={handleClick}
                />
              );
            } else if (message.role === "user") {
              return <UserMessage message={message} />;
            }
            return null;
          })()
        )}
        <div ref={bottomRef as React.RefObject<HTMLDivElement>} />
      </List>
    </>
  );
};

export default MessageList;
