import React, { FC, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import useStyles from "./styles.tsx";
import Header from "./header.tsx";
import { MessageType, Config, QuestionTimelineRadiogroupElement } from "./../utils/types.tsx";
import Footer from './footer.tsx'
import MessageOverview from "./messageOverview";
import MessageList from "./messageList";

interface ChatWidgetProps {
  setShowChatWidget: (flag: boolean) => void;
  setShowToolTip: (flag: boolean) => void;
  storeTimeLineMessages: (message: MessageType) => void;
  messageTemplates: Array<MessageType>;
  messages: Array<MessageType>;
  setMessages: (messages: Array<MessageType>) => void;
  config: Config;
  timeline: Array<MessageType>;
}

const ChatWidget: FC<ChatWidgetProps> = ({
  setShowChatWidget,
  setShowToolTip,
  config,
  messageTemplates,
  storeTimeLineMessages,
  messages,
  setMessages,
  timeline
}) => {

  const styles = useStyles();

  const [surveyData, setSurveyData] = useState({});
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
        <MessageOverview messages={timeline} />
        <MessageList messages={messages} storeTimeLineMessages={storeTimeLineMessages}  />
        <Footer
          storeTimeLineMessages={storeTimeLineMessages}
            setMessage={setMessage}
          />
      </Grid>
    </>
  );
};

export default React.memo(ChatWidget);
