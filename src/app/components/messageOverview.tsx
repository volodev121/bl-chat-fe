import { Grid, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import { MessageType } from "./../utils/types";
import InfoIcon from "@mui/icons-material/Info";
import useStyles from "./styles";
import HelpIcon from "@mui/icons-material/Help";

interface MessageOverviewProps {
  messages: Array<MessageType>;
}

const MessageOverview: React.FC<MessageOverviewProps> = ({ messages }) => {
  const styles = useStyles();

  const getAnsweredMessageCount = () => {
    return messages.filter((message, _index) => (
      message.role === 'bot' && message.completed && !message.customInput
    )).length - 1
  };

  const getMessagesCount = () => {
    return messages.filter((message, _index) => (
      message.role === 'bot' && !message.customInput
    )).length - 1
  }

  return (
    <>
      <Grid xs={4} item>
        <List className={styles.timeLineSideNav}>
          {messages.map((message, _index) =>
            (() => {
              if (message.default && message.role == "bot") {
                return (
                  <ListItem
                    sx={{
                      width: "100%",
                      borderRight: message.completed
                        ? "6px solid #D02DF5"
                        : "unset",
                    }}
                  >
                    <ListItemIcon className={styles.listItemIcon}>
                      <InfoIcon fontSize="small" sx={{ color: "#D02DF5" }} />
                    </ListItemIcon>
                    <Typography className={styles.timeLineSideNavState}>
                      {message.title || message.content}
                    </Typography>
                  </ListItem>
                );
              } else if (message.role == "bot" && !message.customInput) {
                return (
                  <ListItem
                    sx={{
                      width: "100%",
                      borderRight: message.completed
                        ? "6px solid #D02DF5"
                        : "unset",
                    }}
                  >
                    <ListItemIcon className={styles.listItemIcon}>
                      <HelpIcon fontSize="small" sx={{ color: "#D02DF5" }} />
                    </ListItemIcon>
                    <Typography className={styles.timeLineSideNavState}>
                      {message.title || message.content}
                    </Typography>
                  </ListItem>
                );
              }
              return null;
            })()
          )}
          <Typography
            className={styles.timeLineStepText}
            sx={{ paddingLeft: "12px" }}
          >
            {`${getAnsweredMessageCount()} out of ${
              getMessagesCount()
            }`}
          </Typography>
        </List>
      </Grid>
    </>
  );
};


export default MessageOverview;