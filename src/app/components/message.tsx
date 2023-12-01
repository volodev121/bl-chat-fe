import React from "react";
import { MessageType } from "./../utils/types.tsx";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
  Input
} from "@mui/material";

interface MessageProps {
  message: MessageType;
  handleChange: (message: MessageType, label: string) => void;
}

const Message: React.FC<MessageProps> = ({
  message,
  handleChange,
}) => {
  if (!message.element) return;

  switch (message.element.type) {
    case "radiogroup":
      return (
        <FormControl sx={{ marginLeft: "0px", marginRight: "100px" }}>
          <RadioGroup
            aria-labelledby={ `${message.name || message.element.name}-label` }
            name={message.name || message.element.name}
          >
            {message.element.choices.map((choice, index) => (
              <>
                {choice != null && choice.constructor.name === "Object" && (
                  <FormControlLabel
                    key={index}
                    value={choice.value}
                    control={
                      <Radio
                        sx={{
                          color: "#D02DF5",
                          "&.Mui-checked": {
                            color: "#D02DF5",
                          },
                        }}
                        onChange={() => {
                          handleChange(message, choice.text);
                        }}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          fontSize: "14px !important",
                          fontFamily: "poppins !important",
                        }}
                      >
                        {choice.text}
                      </Typography>
                    }
                  />
                )}
              </>
            ))}
          </RadioGroup>
        </FormControl>
      );
    case "text":
      return (
        <FormControl sx={{ marginLeft: "0px", marginRight: "100px" }}>
          <Input
            type='text'
            placeholder={message.placeholder}
            onChange={(event) => {handleChange(message, event.target.value)}}
            disableUnderline
            autoFocus={true}
            sx={{
              fontSize: '16px',
              background: '#F6F6FB !important',
              borderColor: '#F2F2F2 !important',
              '&:hover': {
                background: '#EEF0F8 !important',
              },
            }}
          />
        </FormControl>
      );
  }
};

export default Message;
