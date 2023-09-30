import { FC } from "react";
import { Grid } from "@mui/material";
import useStyles from "./styles.tsx";
import Header from "./header.tsx";

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
  const handleClick = () => {
    setShowChatWidget(false);
    setShowToolTip(true);
  };

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
