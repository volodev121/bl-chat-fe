import { FC } from "react";
import { Grid } from "@mui/material";
import useStyles from "./styles";
import { Button } from "@mui/material";

interface HeaderProps {
  setShowChatWidget: (flag: boolean) => void;
  setShowToolTip: (flag: boolean) => void;
  iconUrl: string;
}

const Header: FC<HeaderProps> = ({
  setShowChatWidget,
  setShowToolTip,
  iconUrl,
}) => {
  const styles = useStyles();

  const handleClick = () => {
    console.log("header clicked");
    setShowChatWidget(false);
    setShowToolTip(true);
  };

  return (
    <Grid container direction="row" className={styles.header}>
      <Grid item xs={2}>
        <span className={styles.headerIcon}>
          <img
            src={iconUrl}
            style={{ height: "64px", width: "64px", borderRadius: "50%" }}
          />
        </span>
      </Grid>
      <Grid item xs={9}></Grid>
      <Grid item xs={1} className={styles.buttonGridContainer}>
        <Button
          sx={{
            backgroundColor: "#F6F7FC !important",
            justifyContent: "center",
            color: "#000000",
            textTransform: "none",
            ":hover": {
              backgroundColor: "#EEF0F8 !important",
              borderColor: "#0062cc",
              boxShadow: "none",
            },
          }}
          onClick={() => handleClick()}
        >
          Collapse
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
