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
  classNames: string;
}

const ChatWidget: FC<ChatWidgetProps> = ({
  setShowChatWidget,
  setShowToolTip,
  classNames,
  config,
  messageTemplates,
  storeTimeLineMessages,
  messages,
  setMessages,
  timeline
}) => {

  const styles = useStyles();

  const [message, setMessage] = useState<MessageType>({ role: 'user', content: '', customInput: true });

  return (
    <>
      <Grid container sx={{ display: 'grid' }}
            className={classNames}>
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
