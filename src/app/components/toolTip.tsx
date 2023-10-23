import React, { FC, useContext } from 'react';
import { Grid, Typography, Button } from "@mui/material";
import useStyles from './styles.tsx';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ConfigContext from "./configContext.tsx";

interface ToolTipProps {
  setShowChatWidget: (flag: boolean) => void;
  setShowToolTip: (flag: boolean) => void;
}

const ToolTip: FC<ToolTipProps> = ({ setShowChatWidget, setShowToolTip }) => {
  const styles = useStyles();
  const handleClick = () => {
    setShowChatWidget(true);
    setShowToolTip(false);
  };
  const config = useContext(ConfigContext);
  const termsLink = <a href={config.terms_of_service_link || '#'} className={styles.termsConditionsLink}>Terms&Conditions</a>;

  return (
    <>
    <Grid className={styles.toolTip}>
      <Grid className={styles.toolTipBlack} item>
        <Grid item className={styles.logo}>
          <img 
            src={config.logo_url} 
            style={{ height: '40px', width: '40px', margin: '2em' }}
            role="presentation"
            alt=""
          />
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
