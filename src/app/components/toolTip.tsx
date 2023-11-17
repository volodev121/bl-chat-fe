import React, { FC, useState, useContext } from 'react';
import { Grid, Typography, Button, Input } from "@mui/material";
import useStyles from './styles.tsx';
import { AiOutlineSend } from "react-icons/ai";
import { isEmpty } from "lodash";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ConfigContext from "./configContext.tsx";

interface ToolTipProps {
  classNames: string;
  setInputValue: (value: string) => void;
  inputValue: string;
  setShowChatWidget: (flag: boolean) => void;
  setShowToolTip: (flag: boolean) => void;
  showToolTip: boolean;
  handleChange: (event: any) => void;
  handleSubmit: () => void;
}

const ToolTip: FC<ToolTipProps> = ({ classNames, inputValue, handleChange, showToolTip, handleSubmit}) => {
  const styles = useStyles();

  const config = useContext(ConfigContext);
  const termsLink = <a href={config.terms_of_service_link || '#'} className={styles.termsConditionsLink}>Terms&Conditions</a>;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isEmpty(inputValue)) handleSubmit();
    }
  };

  return (
    <>
    <Grid className={classNames}>
      <Grid item className={styles.toolTipWhite}>
        <Input
            type='text'
            value={inputValue}
            onChange={handleChange}
            placeholder="Let's start the converstation!"
            className={styles.inputStyle}
            multiline maxRows={3}
            onKeyPress={handleKeyPress}
            disableUnderline
            endAdornment={
              <div className={styles.buttonCircle} style={{ backgroundColor: isEmpty(inputValue) ? '#b6b6ba' : '#000000' }}>
                <Button onClick={handleSubmit}>
                  <AiOutlineSend className={styles.outlineSend} />
                </Button>
              </div>
            }
          />
      </Grid>
      <Typography className={styles.termsConditions}>By continuing you agree to {termsLink}</Typography>
    </Grid>
    </>
  );
};
export default React.memo(ToolTip);
