import React, { FC, useState, useEffect } from "react";
import useStyles from "./styles";
import { IconButton, Input } from "@mui/material";
import { MessageType } from "./../utils/types";
import { isEmpty } from "lodash";
import { AiOutlineSend } from "react-icons/ai";

interface FooterProps {
  disableCustomInput: boolean;
  setMessage: (message: MessageType) => void;
  storeTimeLineMessages: (message: MessageType) => void;
  iconUrl: string;
  baseUrl: string;
}

const Footer: FC<FooterProps> = ({
  disableCustomInput,
  storeTimeLineMessages,
  iconUrl,
  baseUrl,
}) => {
  const styles = useStyles();

  const [inputMessage, setInputMessage] = useState("");
  const [visibleBorderAnimation, setVisibleBorderAnimation] = useState(false);

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

  const startBorderAnimation = () => {
    setVisibleBorderAnimation(true);
  };

  const stopBorderAnimation = () => {
    setTimeout(() => {
      setVisibleBorderAnimation(false);
    }, 3000);
  };

  return (
    <div
      className={
        visibleBorderAnimation
          ? `inputBorder ${styles.footerContainer}`
          : `${styles.footerContainer} ${styles.footerGrayBorder}`
      }
    >
      <div
        className={styles.footer}
        onMouseEnter={startBorderAnimation}
        onMouseLeave={stopBorderAnimation}
      >
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
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "red !important",
                outline: "none",
              },
          }}
          disabled={disableCustomInput}
          endAdornment={
            <div
              className={styles.buttonCircle}
              style={{
                backgroundColor: isEmpty(inputMessage) ? "#ABABBE" : "#D02DF5",
                marginRight: "16px",
              }}
            >
              <IconButton
                onClick={handleSubmit}
                disabled={disableCustomInput}
                sx={{ p: "4px" }}
              >
                <img src={`${baseUrl}/images/send_white.svg`} alt="" />
              </IconButton>
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
    </div>
  );
};

export default Footer;
