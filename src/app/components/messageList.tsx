import React, { useEffect, useRef } from "react";
import { Grid, Typography, List, ListItemIcon, ListItem } from "@mui/material";
import useStyles from "./styles";
import { Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";
import { MessageType } from "./../utils/types.tsx";
import MessageBot from "./messageBot.tsx";
import { useState } from "react";
import Message from "./message.tsx";

interface MessageListProps {
  messages: Array<MessageType>;
  storeTimeLineMessages: (message: MessageType) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  storeTimeLineMessages,
}) => {
  const styles = useStyles();
  const [selectedValue, setSelectedValue] = useState("");
  const [elementDisabled, setElementDisabled] = useState(true);
  const [openModel, setOpenModel] = useState(false);
  const [action, setAction] = useState("");

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
      role: "user",
      content: selectedValue,
      completed: true,
      disabled: true,
      name: message.name,
      customInput: false,
      surveyQuestion: message.surveyQuestion,
    };
    storeTimeLineMessages(msg);
    setElementDisabled(true);
  };

  return (
    <>
      <List className={styles.chatWidgetMessageList}>
        {messages.map((message, _index) =>
          (() => {
            if (message.role === "bot" && message.default) {
              return <MessageBot message={message} ratingAvailable={false} elementDisabled={false} handleChange={handleChange} handleClick={handleClick}/>;
            } else if (message.role === "bot") {
              return <MessageBot message={message} ratingAvailable={true} elementDisabled={false} handleChange={handleChange} handleClick={handleClick} />;
            } else if (message.role === "user") {
              return (
                <ListItem
                  sx={{
                    "flex-wrap": "wrap",
                    "flex-direction": "row-reverse",
                  }}
                >
                  <Grid
                    sx={{
                      background: "#F1DEF5",
                      padding: "12px",
                      maxWidth: "20em",
                      borderRadius: "12px 12px 0px",
                    }}
                  >
                    <Typography className={styles.listItemReplyText}>
                      {message.content}
                    </Typography>
                  </Grid>
                </ListItem>
              );
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
