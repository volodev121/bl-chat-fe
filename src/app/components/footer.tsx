import React, { FC, useState, useRef, useEffect } from "react";
import useStyles from "./styles";
import { Button, Input } from "@mui/material";
import { MessageType } from "./../utils/types";
import { isEmpty } from "lodash";
import SendIcon from "@mui/icons-material/Send";

interface FooterProps {
  setMessage: (message: MessageType) => void;
  storeTimeLineMessages: (message: MessageType) => void;
}

const Footer: FC<FooterProps> = ({ setMessage, storeTimeLineMessages }) => {
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

  //  commented out from below
  
  //   <div className={styles.footer}>
  //     <Input
  //       type='text'
  //       value={inputMessage}
  //       onChange={handleInputChange}
  //       className={styles.footerTextBox}
  //       multiline maxRows={3}
  //       onKeyPress={handleKeyPress}
  //       disableUnderline
  //       sx={{
  //         fontSize: '16px',
  //         background: '#F6F6FB !important',
  //         borderColor: '#F2F2F2 !important',
  //         '&:hover': {
  //           background: '#EEF0F8 !important',
  //         },
  //       }}
  //       endAdornment={
  //         <Button
  //           className={styles.submitButton}
  //           onClick={handleSubmit}
  //           disabled={isEmpty(inputMessage)}
  //           sx={{
  //           ':hover': {
  //             background: 'none !important',
  //           }
  //           }}
  //         >
  //           <SendIcon style={{ color: isEmpty(inputMessage) ? '#b6b6ba' : '#000000' }} />
  //         </Button>
  //       }
  //     />
  //   </div>

  return (
    <>
      <div></div>
    </>
  );
};

export default Footer;
