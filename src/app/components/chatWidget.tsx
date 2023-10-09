import React, { FC, useState } from "react";
import { Grid } from "@mui/material";
import useStyles from "./styles.tsx";
import Header from "./header.tsx";
import ChatWidgetBody from "./chatWidgetBody.tsx";
import { MessageType } from "./../utils/types.tsx";
import Footer from './footer.tsx'
import MessageOverview from "./messageOverview";
import MessageList from "./messageList";
import {mockMessagesList} from './../utils/mocks.tsx'

interface ChatWidgetProps {
  setShowChatWidget: (flag: boolean) => void;
  setShowToolTip: (flag: boolean) => void;
  config: any;
}

const ChatWidget: FC<ChatWidgetProps> = ({
  setShowChatWidget,
  setShowToolTip,
  config,
}) => {
  const styles = useStyles();
  const [messages, setMessages] = useState<Array<MessageType>>(mockMessagesList);
  const storeTimeLineMessages = (message: MessageType) => {
    setMessages((messages) => [...messages, message]);
  }
  const [message, setMessage] = useState<MessageType>({ role: 'user', content: '', customInput: true });

  return (
    <>
      <style >
        {`
          html { overflow: visible }
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
