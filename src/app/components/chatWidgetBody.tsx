import { FC, useState, useRef, useEffect } from 'react';
import { Grid, Typography, List, ListItemIcon, ListItem } from "@mui/material";
import useStyles from './styles';
import { Button, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import ThumbDownOffAlt from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAlt from '@mui/icons-material/ThumbUpOffAlt';
import Divider from '@mui/material/Divider';
import { Config } from './../utils/types';
import { MessageType } from './../utils/types';
import FeedbackModel from './feedbackModel';

interface ChatWidgetBodyProps {
  setShowChatWidget: (flag: boolean) => void
  chatBox: React.ReactNode;
  config: Config;
  messages: Array<MessageType>;
  storeTimeLineMessages: (message: MessageType) => void;
}

const ChatWidgetBody: FC<ChatWidgetBodyProps> = ({ setShowChatWidget, chatBox, config, messages, storeTimeLineMessages }) => {
  const styles = useStyles();
  const [selectedValue, setSelectedValue] = useState('');
  const [elementDisabled, setElementDisabled] = useState(true);
  const [openModel, setOpenModel] = useState(false);
  const [action, setAction] = useState('');
  const bottomRef = useRef<HTMLElement>(null);

  const handleChange = (message: MessageType, label: string) => {
    if (!message.completed) {
      setSelectedValue(label);
      setElementDisabled(false);
    }
  };

  const handleClick = (message: MessageType) => {
    const msg = { role: 'user', content: selectedValue, completed: true, disabled: true, name: message.name, customInput: false, surveyQuestion: message.surveyQuestion }
    storeTimeLineMessages(msg);
    setElementDisabled(true);
  };

  const getAnsweredMessageCount = () => {
    return messages.filter((message, _index) => (
      message.role === 'bot' && message.completed && !message.customInput
    )).length - 1
  };

  const handleThubUp = (message: MessageType) => {
    setOpenModel(true)
    setAction('up')
  };

  const handleThubDown = (message: MessageType) => {
    setOpenModel(false);
    setAction('down');
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [messages]);

  const renderElement = (message: MessageType) => {
    if (!message.element) return;

    switch (message.element.type) {
      case 'radiogroup':
        return (
          <FormControl sx={{ marginLeft: '16px', marginRight: '100px' }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name={message.name}
          >
            {message.element.choices.map((choice, _index) => (
              <>
                { choice != null && choice.constructor.name === "Object" &&  (
                  <FormControlLabel
                    value={choice.value}
                    control={
                      <Radio
                        sx={{
                          color: '#D02DF5',
                          '&.Mui-checked': {
                            color: '#D02DF5',
                          },
                        }}
                        onChange={() => { handleChange(message, choice.text) }}
                      />
                    }
                    label={<Typography sx={{fontSize: '14px !important', fontFamily: 'poppins !important'}}>{choice.text}</Typography>} />
                  )
                }
              </>
            ))}
          </RadioGroup>
        </FormControl>
        )
      }
    }

  return (
    <Grid container spacing={2} columns={16} className={styles.ChatWidgetBody}>
      <Grid xs={4} item>
        <List className={styles.timeLineSideNav}>
        {messages.map((message, _index) => (          
          (() => {
            if (message.default && message.role == 'bot') {
              return (
                <ListItem sx={{ width: '100%', borderRight: message.completed ? '6px solid #D02DF5' : 'unset' }} >
                  <ListItemIcon className={styles.listItemIcon}>
                    <InfoIcon fontSize='small' sx={{ color: '#D02DF5' }} />
                  </ListItemIcon>
                  <Typography className={styles.timeLineSideNavState}>{message.title || message.content}</Typography>
                </ListItem>
              )
            } else if (message.role == 'bot' && !message.customInput) {
              return (
                <ListItem sx={{ width: '100%', borderRight: message.completed ? '6px solid #D02DF5' : 'unset' }} >
                  <ListItemIcon className={styles.listItemIcon}>
                    <HelpIcon fontSize='small' sx={{ color: '#D02DF5' }} />
                  </ListItemIcon>
                  <Typography className={styles.timeLineSideNavState}>{message.title || message.content}</Typography>
                </ListItem>
              )
            }
            return null;
          })()
        ))}
        <Typography className={styles.timeLineStepText} sx={{ paddingLeft: '12px'}}>
          {`${getAnsweredMessageCount()} out ${config.question_timeline?.elements.length}`}
        </Typography>
        </List>
      </Grid>

      <Grid item className={styles.chatContent} xs={10}>
        <List className={styles.chatWidgetMessageList}>
          {messages.map((message, _index) => (
            (() => {
              if (message.element && message.role === 'bot' && message.element.type === 'radiogroup') {
                return (
                  <ListItem sx={{ flexWrap: 'wrap', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <ListItemIcon className={styles.listItemHeadIcon}>
                      <HelpIcon fontSize='medium' sx={{ color: '#D02DF5' }}/>
                      <Typography variant="h6" className={styles.listItemHead}>{message.title || message.content}</Typography>
                    </ListItemIcon>
                    <div className={styles.listItemContent}>
                      {renderElement(message)}
                    </div>
                    <div>
                      <Button
                        variant='contained'
                        disabled={message.completed ? true : elementDisabled}
                        onClick={() => { handleClick(message) }}
                        sx={{
                          color: '#FFFFFF', 
                          textTransform: 'none',
                          backgroundColor: '#D02DF5',
                          ':hover': {
                            backgroundColor: '#aa32c5',
                            borderColor: '#0062cc',
                            boxShadow: 'none',
                          },
                          "&.Mui-disabled": {
                            background: "#e082f5",
                            color: '#FFFFFF',
                          },
                          boxShadow: 'none',
                        }}
                      >
                        Send answer
                      </Button>
                    </div>
                  </ListItem>
                )
              } else if (message.role === 'bot') {
                return (
                  <ListItem sx={{ 'flex-wrap': 'wrap',  maxWidth: '40em'}}>
                    <ListItemIcon className={styles.listItemHeadIcon}>
                      {!message.customInput && <InfoIcon fontSize='medium' sx={{ color: '#D02DF5' }}/>}
                      <Typography variant="h6" className={styles.listItemHead}>{message.content}</Typography>
                    </ListItemIcon>
                    { !message.default && (
                      <div className={styles.feedbackContainer}>
                         <div className={styles.thumbUp}>
                          <ThumbUpOffAlt onClick={() => handleThubUp(message)} />
                        </div>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <div className={styles.thumbDown}>
                          <ThumbDownOffAlt onClick={() => handleThubDown(message)} />
                        </div>
                      </div>
                      )
                    }
                  <FeedbackModel message={message} setOpenModel={setOpenModel} openModel={openModel} action={action} />
                  </ListItem>
                )
              } else if (message.role === 'bot' && message.default) {
                return (
                  <ListItem sx={{ 'flex-wrap': 'wrap'}}>
                    <ListItemIcon className={styles.listItemHeadIcon}>
                      <InfoIcon fontSize='medium' sx={{ color: '#D02DF5' }}/>
                      <Typography variant="h6" className={styles.listItemHead}>{message.title ?? message.content}</Typography>
                    </ListItemIcon>
                    <div>
                      <Typography className={styles.listItemText}>{message.content}</Typography>
                    </div>
                  </ListItem>
                )
              } else if (message.role === 'user') {
                return (
                  <ListItem sx={{ 'flex-wrap': 'wrap', 'flex-direction': 'row-reverse' }}>
                    <Grid sx={{ background: '#F1DEF5',  padding: '12px', maxWidth: '20em', borderRadius: '12px 12px 0px' }}>
                      <Typography className={styles.listItemReplyText}>{message.content}</Typography>
                    </Grid>
                  </ListItem>
                )
              }
            return null;
            })()
          ))}
          <div ref={bottomRef as React.RefObject<HTMLDivElement>} />
        </List>
        <Grid >
          {chatBox}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChatWidgetBody;
