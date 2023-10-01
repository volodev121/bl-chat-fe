import { FC } from "react";
import { Grid } from "@mui/material";
import useStyles from "./styles.tsx";
import Header from "./header.tsx";
import ChatWidgetBody from "./chatWidgetBody.tsx";
import { MessageType } from "./../utils/types.tsx";
import { useState } from 'react'
import Footer from './footer.tsx'
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
      <Grid container>
        <Header
          setShowChatWidget={setShowChatWidget}
          setShowToolTip={setShowToolTip}
          iconUrl={config.icon_url}
        />
        <ChatWidgetBody
          messages={messages}
          storeTimeLineMessages={storeTimeLineMessages}
          config={config}
          setShowChatWidget={setShowChatWidget}
          chatBox={
            <Footer
              storeTimeLineMessages={storeTimeLineMessages}
              setMessage={setMessage}
            />
          }
        />
        {/* <MessagesList messages={messages} setMessage={setMessage}/> */}
      </Grid>
    </>
  );
};

export default ChatWidget;
