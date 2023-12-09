import React, { FC, useContext, useState } from "react";
import { Grid, Typography, Button, Input } from "@mui/material";
import useStyles from "./styles.tsx";
import { AiOutlineSend } from "react-icons/ai";
import { isEmpty } from "lodash";
import ConfigContext from "./configContext.tsx";

interface ToolTipProps {
  classNames: string;
  setInputValue: (value: string) => void;
  inputValue: string;
  setShowChatWidget: (flag: boolean) => void;
  setShowToolTip: (flag: boolean) => void;
  handleChange: (event: any) => void;
  handleSubmit: () => void;
}

const ToolTip: FC<ToolTipProps> = ({
  classNames,
  inputValue,
  handleChange,
  handleSubmit,
}) => {
  const styles = useStyles();
  const [style, setStyle] = useState({});
  const config = useContext(ConfigContext);
  const termsLink = (
    <a
      href={config.terms_of_service_link || "#"}
      className={styles.termsConditionsLink}
    >
      Terms&Conditions
    </a>
  );

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isEmpty(inputValue)) handleSubmit();
    }
  };

  return (
    <>
      <Grid className={classNames}
        onMouseEnter={e => {
          setStyle({display: 'block'});
        }}
        onMouseLeave={e => {
          setStyle({display: 'none'})
      }}
      >
        <Grid item className={styles.toolTipWhite}>
          <div 
            className={`${styles.borderAnimation}`}
            style={style}
          />
          <Input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Type your message"
            className={styles.inputStyle}
            multiline
            maxRows={3}
            onKeyPress={handleKeyPress}
            disableUnderline
            endAdornment={
              <div
                className={styles.buttonCircle}
                style={{
                  backgroundColor: isEmpty(inputValue) ? "#ABABBE" : "#000000",
                }}
              >
                <Button
                  onClick={handleSubmit}
                  sx={{ minWidth: "32px", height: "32px", borderRadius: "50%" }}
                >
                  <img 
                    src="/images/send_white.svg"
                    alt=""
                  />
                </Button>
              </div>
            }
          />
        </Grid>
        {/* <Typography className={styles.termsConditions}>By continuing you agree to {termsLink}</Typography> */}
      </Grid>
    </>
  );
};
export default React.memo(ToolTip);
