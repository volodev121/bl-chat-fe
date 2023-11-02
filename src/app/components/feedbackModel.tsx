import React, { FC, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MessageType } from './../utils/types';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ThumbDownOffAlt from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAlt from '@mui/icons-material/ThumbUpOffAlt';
import useStyles from './styles';
import { Button, Input } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface feedbackModelProps {
  message: MessageType;
  setOpenModel: (flag: boolean) => void;
  openModel: boolean;
  action: string;
}

const FeedbackModel: FC<feedbackModelProps> = ({ message, setOpenModel, openModel, action }) => {
  const styles = useStyles();

  const handleClose = () => {
    setOpenModel(false);
  };

  const handleSubmit = () => {
    setOpenModel(false);
  };

  if (!openModel) {
    return null;
  }
  debugger;
  return (
    <div>
      <Modal
        open={openModel}
        onClose={() => { setOpenModel(false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box className={styles.modelStyle}>
            { action === 'down' && (<ThumbDownOffAlt sx={{ color: '#A51818', background: '#F6E6E6', width: '25px',  padding: '7px', borderRadius: '50%' }} />)}
            { action === 'up' && (<ThumbUpOffAlt sx={{ color: '#A51818', background: '#F6E6E6', width: '25px',  padding: '7px', borderRadius: '50%' }} />)}
            
            <IconButton
                aria-label="close"
                // onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                >
                <CloseIcon onClick={() => {handleClose()}}/>
            </IconButton>
            <Typography sx={{ fontWeight: 'bold' }} id="modal-modal-title" variant="h6" component="h2">
                Provide additional feedback
            </Typography>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
            <FormGroup>
                <div style={{ margin: '1em 0em 2em 0em'}}>
                    <Input
                        autoFocus
                        margin="dense"
                        id="reasons"
                        type="reasons"
                        fullWidth
                        disableUnderline
                        multiline
                        maxRows={3}
                        placeholder='What was the issue with response?'
                        sx={{
                            fontSize: '14px',
                            background: '#F6F6FB !important',
                            borderColor: '#F2F2F2 !important',
                            '&:hover': {
                            background: '#EEF0F8 !important',
                            },
                            'flex-grow': 1,
                            padding: '5px',
                            border: 'solid',
                            borderRadius: '12px',
                            paddingLeft: '16px !important',
                            fontFamily: 'poppins !important',
                        }}
                    />
                </div>
                <FormControlLabel control={<Checkbox  sx={{
                          color: '#D02DF5',
                          '&.Mui-checked': {
                            color: '#D02DF5',
                          },
                        }}/>} label="This is harmful / unsafe" />
                <FormControlLabel control={<Checkbox  sx={{
                          color: '#D02DF5',
                          '&.Mui-checked': {
                            color: '#D02DF5',
                          },
                        }}/>} label="This isn't true" />
                <FormControlLabel control={<Checkbox  sx={{
                          color: '#D02DF5',
                          '&.Mui-checked': {
                            color: '#D02DF5',
                          },
                        }}/>} label="This isn't helpful" />
            </FormGroup>
            <Button sx={{color: 'black'}} onClick={() => { handleClose() }}>Cancel</Button>
            <Button
                onClick={() => { handleSubmit() }}
                style={{left: '72%'}}
                variant="contained"
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
                Submit
            </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default React.memo(FeedbackModel);
