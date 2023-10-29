import React, { FC, useState } from 'react';
import { Grid, Typography, Button, Input } from "@mui/material";
import useStyles from './styles.tsx';
import { isEmpty } from 'lodash';
import { AiOutlineSend } from "react-icons/ai";

interface ToolTipProps {
  setShowChatWidget: (flag: boolean) => void;
  setShowToolTip: (flag: boolean) => void;
  config: any;
}

const ToolTip: FC<ToolTipProps> = ({ setShowChatWidget, setShowToolTip, config }) => {
  const styles = useStyles();
  const [inputValue, setInputValue] = useState(''); // State to manage input value

  const handleClick = () => {
    setShowChatWidget(true);
    setShowToolTip(false);
  };

  const [inputMessage, setInputMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const termsLink = <a href={config.terms_of_service_link || '#'} className={styles.termsConditionsLink}>Terms&Conditions</a>;

  return (
    <>
    <Grid className={styles.toolTip}>
      <Grid item className={styles.toolTipWhite}>
        <Input
            type='text'
            value={inputValue}
            onChange={handleChange}
            placeholder="Let's start the converstation!"
            className={styles.inputStyle}
            disableUnderline
            endAdornment={
              <div className={styles.buttonCircle} style={{ backgroundColor: isEmpty(inputValue) ? '#b6b6ba' : '#000000' }}>
                <Button>
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
export default ToolTip;