import React from "react";
import { List, ListItem, ListItemIcon, Typography } from "@mui/material";
import { MessageType } from "./../utils/types";
import InfoIcon from "@mui/icons-material/Info";
import useStyles from "./styles";

interface MessageOverviewProps {
  messages: Array<MessageType>;
}

const MessageOverview: React.FC<MessageOverviewProps> = ({ messages }) => {
  const styles = useStyles();
  const eledgableMessages = messages.filter(
    (message, _index) =>
      message.role === "bot" && !message.customInput && message.surveyQuestion
  );

  const getAnsweredMessageCount = () => {
    return eledgableMessages.filter((message, _index) => message.completed)
      .length;
  };

  const getMessagesCount = () => {
    return eledgableMessages.length;
  };

  return (
    <div className={styles.messageOverviewWrapper}>
      <List className={styles.messageOverview}>
        {messages.map((message, index) =>
          (() => {
            if (message.role == "bot") {
              return (
                <ListItem
                  key={index}
                  // sx={{
                  //   width: "100%",
                  //   borderRight: message.completed
                  //     ? "6px solid #D02DF5"
                  //     : "unset",
                  // }}
                >
                  <ListItemIcon className={styles.listItemIcon}>
                    <InfoIcon fontSize="small" sx={{ color: "#D02DF5" }} />
                  </ListItemIcon>
                  <Typography className={styles.messageOverviewState}>
                    {message.title || message.content}
                  </Typography>
                </ListItem>
              );
            }
          })()
        )}
        <div style={{display: "inline-flex"}}>
          <Typography
            className={styles.timeLineStepText}
            sx={{ paddingLeft: "12px", color: "#D02DF5" }}
          >
            {`${getAnsweredMessageCount()}`}
          </Typography>
          <Typography
            className={styles.timeLineStepText}
            sx={{ paddingLeft: "4px" }}
          >
            {` out of ${getMessagesCount()}`}
          </Typography>
        </div>
      </List>
    </div>
  );
};

export default MessageOverview;
