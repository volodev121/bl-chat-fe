import React, { FC, useState, useEffect } from "react";
import useStyles from "./styles";
import { Button, Input } from "@mui/material";
import { MessageType } from "./../utils/types";
import { isEmpty } from "lodash";
import { AiOutlineSend } from "react-icons/ai";
import classes from './border.module.css'

interface FooterProps {
  disableCustomInput: boolean;
  setMessage: (message: MessageType) => void;
  storeTimeLineMessages: (message: MessageType) => void;
  iconUrl: string;
}

const Footer: FC<FooterProps> = ({
  disableCustomInput,
  storeTimeLineMessages,
  iconUrl,
}) => {
  const styles = useStyles();

  const [inputMessage, setInputMessage] = useState("");

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

  return (
    <>
      <div className={styles.footer}>
          <Input
            type="text"
            value={inputMessage}
            onChange={handleInputChange}
            className={`${styles.footerTextBox}`}
            placeholder="Type your message"
            multiline
            maxRows={3}
            onKeyPress={handleKeyPress}
            disableUnderline
            sx={{
              "&:hover": {
                background: "#EEF0F8 !important",
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'red !important'
              }
            }}
            disabled={disableCustomInput}
            endAdornment={
              <div
                className={styles.buttonCircle}
                style={{
                  backgroundColor: isEmpty(inputMessage) ? "#ABABBE" : "#000000",
                  marginRight: '16px'
                }}
              >
                <Button onClick={handleSubmit} disabled={disableCustomInput}>
                  <img src="/images/send_white.svg" alt="" />
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
    </>
  );
};

export default Footer;
