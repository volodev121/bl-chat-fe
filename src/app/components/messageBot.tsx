import React from "react";
import { MessageType } from "./../utils/types.tsx";
import { ListItem, ListItemIcon, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import useStyles from "./styles";
import { ThumbUpOffAlt } from "@mui/icons-material";
import { Divider } from "@mui/material";
import { ThumbDownOffAlt } from "@mui/icons-material";
import FeedbackModel from "./feedbackModel.tsx";
import { Button } from "@mui/material";
import Message from "./message.tsx";
import HelpIcon from "@mui/icons-material/Help";

interface BotMessageProps {
  message: MessageType;
  elementDisabled: boolean;
  ratingAvailable: boolean;
  handleClick: (message: MessageType) => void;
  handleChange: (message: MessageType, label: string) => void;
}

const BotMessage: React.FC<BotMessageProps> = ({
  message,
  ratingAvailable,
  handleClick = null,
  handleChange = null,
  elementDisabled = false,
}) => {
  const styles = useStyles();

  const handleThumbUp = (message: MessageType) => {};
  const handleThumbDown = (message: MessageType) => {};
  const [openModel, setOpenModel] = React.useState(false);

  if (handleChange == null) {
    handleChange = (msg, lbl) => {};
  }

  if (
    message.element &&
    message.role === "bot" &&
    message.element.type === "radiogroup"
  ) {
    return (
      <ListItem
        sx={{
          flexWrap: "wrap",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <ListItemIcon className={styles.listItemHeadIcon}>
          <HelpIcon fontSize="medium" sx={{ color: "#D02DF5" }} />
          <Typography variant="h6" className={styles.listItemHead}>
            {message.title || message.content}
          </Typography>
        </ListItemIcon>
        <div className={styles.listItemContent}>
          <Message message={message} handleChange={handleChange ? handleChange : (msg, lbl) => {}} />
        </div>
        <div>
          <Button
            variant="contained"
            disabled={message.completed ? true : elementDisabled}
            onClick={() => {
              handleClick ? handleClick(message) : null;
            }}
            sx={{
              color: "#FFFFFF",
              textTransform: "none",
              backgroundColor: "#D02DF5",
              ":hover": {
                backgroundColor: "#aa32c5",
                borderColor: "#0062cc",
                boxShadow: "none",
              },
              "&.Mui-disabled": {
                background: "#e082f5",
                color: "#FFFFFF",
              },
              boxShadow: "none",
            }}
          >
            Send answer
          </Button>
        </div>
      </ListItem>
    );
  }

  return (
    <>
      <ListItem sx={{ "flex-wrap": "wrap", maxWidth: "40em" }}>
        <ListItemIcon className={styles.listItemHeadIcon}>
          {!message.customInput && (
            <InfoIcon fontSize="medium" sx={{ color: "#D02DF5" }} />
          )}
          <Typography variant="h6" className={styles.listItemHead}>
            {message.content}
          </Typography>
        </ListItemIcon>
        {ratingAvailable && (
          <div className={styles.feedbackContainer}>
            <div className={styles.thumbUp}>
              <ThumbUpOffAlt onClick={() => handleThumbUp(message)} />
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div className={styles.thumbDown}>
              <ThumbDownOffAlt onClick={() => handleThumbDown(message)} />
            </div>
          </div>
        )}
        <FeedbackModel
          message={message}
          setOpenModel={setOpenModel}
          openModel={false}
          action={"test"}
        />
      </ListItem>
    </>
  );
};

export default BotMessage;
