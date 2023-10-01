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
    console.log('header clicked')
    setShowChatWidget(false);
    setShowToolTip(true);
  };

  return (
    <Grid container direction="row" className={styles.header}>
      <span className={styles.headerIcon}>
        <img
          src={iconUrl}
          style={{ height: "64px", width: "64px", borderRadius: "50%" }}
        />
      </span>
      <Button
        //className={styles.buttonCollapse}
        sx={{
          backgroundColor: "#F6F7FC !important",
          //marginLeft: "110em",
          justifyContent: 'center',
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
  );
};

export default Header;
