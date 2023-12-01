import React, { FC, useState, useEffect } from "react";
import useStyles from './styles';
import { Button, Input } from "@mui/material";
import { MessageType } from "./../utils/types";
import { isEmpty } from "lodash";
import { AiOutlineSend } from "react-icons/ai";

interface FooterProps {
  messages: Array<MessageType>;
  setMessage: (message: MessageType) => void;
  storeTimeLineMessages: (message: MessageType) => void;
  iconUrl: string;
}

const Footer: FC<FooterProps> = ({ messages, storeTimeLineMessages, iconUrl }) => {
  const styles = useStyles();

  const [inputMessage, setInputMessage] = useState("");
  const [disableInput, setDisableInput] = useState(true);

  useEffect(
    () => {
      const msg = messages[messages.length - 1];
      setDisableInput(msg.role == 'bot' && (msg.id != null || msg.content == 'thinking...'));
    },
    [messages]
  );

  const handleSubmit = () => {
    if (!inputMessage) return;

    const msg = {
      key: `${Date.now()}-user`,
      role: "user",
      content: inputMessage,
      customInput: true,
      time: new Date().toISOString(),
    };
    storeTimeLineMessages(msg);
    setInputMessage("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isEmpty(inputMessage)) handleSubmit();
    }
  };

  return (<>
    <div className={styles.footer}>
      <Input
        type='text'
        value={inputMessage}
        onChange={handleInputChange}
        className={styles.footerTextBox}
        multiline maxRows={3}
        onKeyPress={handleKeyPress}
        disableUnderline
        sx={{
          '&:hover': {
            background: '#EEF0F8 !important',
          },
        }}
        disabled={disableInput}
        endAdornment={
          <div className={styles.buttonCircle} style={{ backgroundColor: isEmpty(inputMessage) ? '#000000' : '#000000' }}>
          <Button onClick={handleSubmit} disabled={disableInput}>
            <img src={iconUrl} style={{ height: '26px', width: '26px', borderRadius: '50%' }} role='presentation' alt='' />
          </Button>
        </div>
          // <Button
          //   className={styles.submitButton}
          //   onClick={handleSubmit}
          //   disabled={isEmpty(inputMessage)}
          //   sx={{
          //   ':hover': {
          //     background: 'none !important',
          //   }
          //   }}
          // >
          //   <SendIcon style={{ color: isEmpty(inputMessage) ? '#b6b6ba' : '#000000'}} />
          // </Button>
        }
      />
    </div>
   </>);
};

export default Footer;
