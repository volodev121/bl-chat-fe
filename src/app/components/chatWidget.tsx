import React, { FC, useState, useEffect, useContext } from "react";
import { Grid } from "@mui/material";
import useStyles from "./styles.tsx";
import Header from "./header.tsx";
import { MessageType, Config, QuestionTimelineRadiogroupElement } from "./../utils/types.tsx";
import Footer from './footer.tsx'
import MessageOverview from "./messageOverview";
import MessageList from "./messageList";
import ApiClientContext from "./apiContext.tsx";
import ConfigContext from "./configContext.tsx";

interface ChatWidgetProps {
  setShowChatWidget: (flag: boolean) => void;
  setShowToolTip: (flag: boolean) => void;
  storeTimeLineMessages: (message: MessageType) => void;
  messageTemplates: Array<MessageType>;
  messages: Array<MessageType>;
  setMessages: (messages: Array<MessageType>) => void;
  config: Config;
  timeline: Array<MessageType>;
  classNames: string;
  baseUrl: string;
  updateMessageFactory: (key: string) => (message: MessageType) => void;
}

const ChatWidget: FC<ChatWidgetProps> = ({
  classNames,
  messageTemplates,
  setShowChatWidget,
  setShowToolTip,
  messages,
  setMessages,
  storeTimeLineMessages,
  timeline,
  baseUrl,
  updateMessageFactory,
}) => {

  const iconUrl = `${baseUrl}/public/kaia_small.png`

  const styles = useStyles();

  const [message, setMessage] = useState<MessageType>({ role: 'user', content: '', customInput: true });
  const config = useContext(ConfigContext);
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
        />
        <Footer
          storeTimeLineMessages={storeTimeLineMessages}
            setMessage={setMessage}
        />
      </Grid>
    </>
  );
};

export default React.memo(ChatWidget);
