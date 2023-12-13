import React from "react";
import { MessageType } from "./../utils/types.tsx";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
  Input,
  Checkbox,
} from "@mui/material";
import Divider from "@mui/material/Divider";
interface MessageProps {
  message: MessageType;
  handleChange: (message: MessageType, label: string) => void;
  handleClick: (message: MessageType, label: string) => void;
}

const Message: React.FC<MessageProps> = ({
  message,
  handleChange,
  handleClick,
}) => {
  if (!message.element) return;
  console.log("message.element====>", message.element);

  switch (message.element.type) {
    case "radiogroup":
      return (
        <FormControl
          sx={{ marginLeft: "0px", marginRight: "100px", width: "100%" }}
        >
          <RadioGroup
            aria-labelledby={`${message.name || message.element.name}-label`}
            name={message.name || message.element.name}
            sx={{ width: "100%" }}
          >
            {message.element.choices.map((choice, index) => (
              <>
                {choice != null && choice.constructor.name === "Object" && (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                    }}
                  >
                    <FormControlLabel
                      key={index}
                      value={choice.value}
                      sx={{ml: "12px"}}
                      control={
                        <Radio
                          sx={{
                            color: "#D02DF5",
                            "&.Mui-checked": {
                              color: "#D02DF5",
                            },
                            padding: "4px 4px 4px 0px"
                          }}
                          onChange={() => {
                            handleChange(message, choice.text);
                            handleClick ? handleClick(message, choice.text) : null;
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
                  </div>
                )}
              </>
            ))}
          </RadioGroup>
        </FormControl>
      );
    case "text":
      return (
        <FormControl sx={{ margin: "12px 24px 12px 12px" }}>
          <Input
            type="text"
            placeholder={message.placeholder}
            onChange={(event) => {
              handleChange(message, event.target.value);
            }}
            disableUnderline
            autoFocus={true}
            sx={{
              fontSize: "16px",
              background: "#F6F6FB !important",
              borderColor: "#F2F2F2 !important",
              "&:hover": {
                background: "#EEF0F8 !important",
              },
            }}
          />
        </FormControl>
      );
    case "checkbox": {
      return (
        <FormControl
          sx={{ marginLeft: "0px", marginRight: "100px", width: "100%" }}
        >
          {message.element.choices.map((choice, index) => (
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={choice.text}
            />
          ))}
        </FormControl>
      );
    }
  }
};

export default Message;
