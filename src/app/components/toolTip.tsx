import React, { FC, useState } from 'react';
import { Grid, Typography, Button, Input, Paper } from "@mui/material"; // Import Input component
import useStyles from './styles.tsx';
import AppleIcon from '@mui/icons-material/Apple';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import { isEmpty } from 'lodash';
import ChatIcon from '@mui/icons-material/Chat';



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
    setInputValue(event.target.value); // Update input value when it changes
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
              <Button style= {{borderRadius: '100%', borderColor: '#ABABBE', width: '32px', height:'32px'}}>
                <SendIcon style={{ color: 'black' }} />
              </Button>
            }
          />
      </Grid>
        <Typography className={styles.termsConditions}>By continuing you agree to {termsLink}</Typography>
    </Grid>
    </>
  );
};

export default ToolTip;
