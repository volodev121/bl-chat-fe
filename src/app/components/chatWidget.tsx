import React, { FC, useState, useContext } from "react";
import { Grid } from "@mui/material";
import Header from "./header.tsx";
import { MessageType } from "./../utils/types.tsx";
import Footer from './footer.tsx'
import MessageOverview from "./messageOverview";
import MessageList from "./messageList";
import ApiClientContext from "./apiContext.tsx";

interface ChatWidgetProps {
  setShowChatWidget: (flag: boolean) => void;
  setShowToolTip: (flag: boolean) => void;
  storeTimeLineMessages: (message: MessageType) => void;
  messageTemplates: Array<MessageType>;
  messages: Array<MessageType>;
  setMessages: (messages: Array<MessageType>) => void;
  timeline: Array<MessageType>;
  classNames: string;
  baseUrl: string;
  updateMessageFactory: (key: string) => (message: MessageType) => void;
}

const ChatWidget: FC<ChatWidgetProps> = ({
  classNames,
  setShowChatWidget,
  setShowToolTip,
  messages,
  storeTimeLineMessages,
  timeline,
  baseUrl,
  updateMessageFactory,
}) => {

  const iconUrl = `${baseUrl}/kaia_small.png`
  const iconUrlSendButton = `${baseUrl}/kaia_arrow.svg`

  const [message, setMessage] = useState<MessageType>({ role: 'user', content: '', customInput: true });
  const apiClient = useContext(ApiClientContext);

  return (
    <>
      <Grid container sx={{ display: 'grid' }}
            className={classNames}>
        <Header
          setShowChatWidget={setShowChatWidget}
          setShowToolTip={setShowToolTip}
          iconUrl={iconUrl}
        />
        <MessageOverview messages={timeline} />
        <MessageList
          messages={messages}
          storeTimeLineMessages={storeTimeLineMessages}
          apiClient={apiClient}
          updateMessageFactory={updateMessageFactory}
          iconUrl={iconUrl}
        />
        <Footer
          messages={messages}
          iconUrl={iconUrlSendButton}
          storeTimeLineMessages={storeTimeLineMessages}
          setMessage={setMessage}
        />
      </Grid>
    </>
  );
};

export default React.memo(ChatWidget);
