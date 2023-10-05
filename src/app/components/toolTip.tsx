import React, { FC } from 'react';
import { Grid, Typography, Button } from "@mui/material";
import useStyles from './styles.tsx';
import AppleIcon from '@mui/icons-material/Apple';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ToolTipProps {
  setShowChatWidget: (flag: boolean) => void;
  setShowToolTip: (flag: boolean) => void;
  config: any;
}

const ToolTip: FC<ToolTipProps> = ({ setShowChatWidget, setShowToolTip, config }) => {
  const styles = useStyles();
  const handleClick = () => {
    setShowChatWidget(true);
    setShowToolTip(false);
  };
  const termsLink = <a href={config.terms_of_service_link || '#'} className={styles.termsConditionsLink}>Terms&Conditions</a>;

  return (
    <>
    <Grid className={styles.toolTip}>
      <Grid className={styles.toolTipBlack} item>
        <Grid item className={styles.logo}>
          <img src={config.logo_url} style={{ height: '40px', width: '40px', margin: '2em' }}/>
        </Grid>
        <Typography className={styles.toolTipText}>{config.widget_headline}</Typography>
      </Grid>
      <Grid item className={styles.toolTipWhite}>
        <Button
          variant="contained"
          className={styles.findCrmButton}
          sx={{
            backgroundColor: '#D02DF5',
            textTransform: 'none',
            width: 270,
            ':hover': {
              backgroundColor: '#aa32c5',
              borderColor: '#0062cc',
              boxShadow: 'none',
            },
          }}
          endIcon={<ArrowForwardIosIcon style={{ fontSize: '15px', marginLeft:'5em' }} />}
          onClick={() => handleClick()}
        >
          {config.cta_button_prompt}
        </Button>
      </Grid>
      <Typography className={styles.termsConditions}>By continuing you agree to {termsLink}</Typography>
    </Grid>
    </>
  );
};

export default ToolTip;
