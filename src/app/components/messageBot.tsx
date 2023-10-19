import React from "react";
import { MessageType } from "./../utils/types.tsx";
import { ListItem, ListItemIcon, Typography, Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import useStyles from "./styles";
import { ThumbUpOffAlt, ThumbUpAlt } from "@mui/icons-material";
import { Divider } from "@mui/material";
import { ThumbDownOffAlt, ThumbDownAlt } from "@mui/icons-material";
import FeedbackModel from "./feedbackModel.tsx";
import { Button } from "@mui/material";
import Message from "./message.tsx";
import HelpIcon from "@mui/icons-material/Help";
import Accordion from '@mui/material/Accordion'; //accordion dependencies
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface BotMessageProps {
  message: MessageType;
  elementDisabled: boolean;
  ratingAvailable: boolean;
  updateSelf: (message: MessageType) => void;
  handleClick: (message: MessageType) => void;
  handleChange: (message: MessageType, label: string) => void;
}

const BotMessage: React.FC<BotMessageProps> = ({
  message,
  apiClient,
  updateSelf, 
  ratingAvailable,
  handleClick = null,
  handleChange = null,
  elementDisabled = false,
}) => {
  const styles = useStyles();

  const handleThumbUp = (message: MessageType) => { 
    if (!message.rating || message.rating.value === null) {
      message["rating"] = {time: (new Date()).toISOString(), value: true}; 
      apiClient.sendRating(message);
      updateSelf(message);
    }
  };
  const handleThumbDown = (message: MessageType) => {
    if (!message.rating || message.rating.value === null) {
      setOpenModel(() => true)
    }
  };
  const handleFeedbackSubmit = (message: MessageType, reasons: Array) => {
      setOpenModel(() => false)
      message["rating"] = {time: (new Date()).toISOString(), value: false, reasons: reasons}; 
      apiClient.sendRating(message);
      updateSelf(message);
  }
  const [openModel, setOpenModel] = React.useState(false);
  const [openContext, setOpenContext] = React.useState(false);

  if (handleChange == null) {
    handleChange = (msg, lbl) => {};
  }
  const finalText = message.title || message.content;
  if (
    message.element &&
    message.role === "bot" &&
    (message.element.type === "radiogroup" || 
    message.element.type === "text"
    )
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
          <Typography variant="h6" className={styles.listItemHead} id={ `${message.name}-label` }>
            {finalText.split("\n").map(function(item, idx) {
                return (
                    <span key={idx}>
                        {item}
                        <br/>
                    </span>
                 )
            })}
          </Typography>
        </ListItemIcon>
        <div className={styles.listItemContent}>
          <Message message={message} handleChange={handleChange} />
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
          {!message.customInput &&message.element && message.element.type !== "image" && (
            <InfoIcon fontSize="medium" sx={{ color: "#D02DF5" }} />
          )}
          <Typography variant="h6" className={styles.listItemHead}>
            {message.content.split('\n').map(function(item, idx) {
                return (
                    <span key={idx}>
                        {item}
                        <br/>
                    </span>
                 )
            })}
          </Typography>
          {message.element && message.element.type == "image" && message.element.imageLink && (
            <img src={message.element.imageLink} alt={message.element.altText} style={ { height: message.element.imageHeight || "100%", width: message.element.imageWidth || "auto" }} />
          )}
        </ListItemIcon>
        {ratingAvailable && (
          <div className={styles.feedbackContainer}>
            <div className={styles.thumbUp}>
              { message.rating && message.rating.value === true && (
                <ThumbUpAlt onClick={() => handleThumbUp(message)} />
              ) || (
                <ThumbUpOffAlt onClick={() => handleThumbUp(message)} />
              ) }
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div className={styles.thumbDown}>
              { message.rating && message.rating.value === false && (
                <ThumbDownAlt onClick={() => handleThumbDown(message)} />
              ) || (
                <ThumbDownOffAlt onClick={() => handleThumbDown(message)} />
              ) }
            </div>
          </div>
        )}
        <FeedbackModel
          message={message}
          setOpenModel={setOpenModel}
          openModel={openModel}
          action={"test"}
          handleSubmit={(reasons) => handleFeedbackSubmit(message, reasons)}
        />
        { message.context && message.context.length && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={ `${message.key}-context-content`}
              id={ `${message.key}-context-header` }
            >
              <Typography>Context</Typography>
            </AccordionSummary>
            <AccordionDetails>
              { message.context.map((contextItem, index) => {
                  console.log(contextItem) 
                  return (
                    <Box>
                      <Typography variant="caption" >
                        {contextItem.source}
                      </Typography>
                      <Typography variant="body2" >
                        {contextItem.content}
                      </Typography>
                      <progress 
                        id={ `${message.key}-context-${index}` } 
                        value={contextItem.score} 
                        max="1.0" 
                        title={ contextItem.score.toFixed(4) } > 
                          { (contextItem.score * 100).toFixed(2) }% 
                        </progress>
                    </Box>
                  );
                }
              )}
            </AccordionDetails>
          </Accordion>
        )}
      </ListItem>
    </>
  );
};

export default BotMessage;
