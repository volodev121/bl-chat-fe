import React, { FC, useState, useRef, useEffect } from "react";
import { Grid, Typography, List, ListItemIcon, ListItem } from "@mui/material";
import useStyles from "./styles";
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { Config } from "./../utils/types";
import { MessageType } from "./../utils/types";
import MessageOverview from "./messageOverview";
import MessageList from "./messageList";

interface ChatWidgetBodyProps {
  setShowChatWidget: (flag: boolean) => void;
  chatBox: React.ReactNode;
  config: Config;
  messages: Array<MessageType>;
  storeTimeLineMessages: (message: MessageType) => void;
}

const ChatWidgetBody: FC<ChatWidgetBodyProps> = ({
  setShowChatWidget,
  chatBox,
  config,
  messages,
  storeTimeLineMessages,
}) => {
  const styles = useStyles();

  return (
    <Grid container spacing={2} columns={16} className={styles.ChatWidgetBody}>
      <MessageOverview messages={messages} />

      <Grid item className={styles.chatContent} xs={10}>
        <MessageList messages={messages} storeTimeLineMessages={storeTimeLineMessages} />
        <Grid>{chatBox}</Grid>
      </Grid>
    </Grid>
  );
};

export default ChatWidgetBody;
