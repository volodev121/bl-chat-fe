import React from "react";
import { MessageType } from "./../utils/types.tsx";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
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
        <FormControl sx={{ marginLeft: "16px", marginRight: "100px" }}>
          <RadioGroup
            aria-labelledby={ `${message.name}-label` }
            name={message.name}
          >
            {message.element.choices.map((choice, _index) => (
              <>
                {choice != null && choice.constructor.name === "Object" && (
                  <FormControlLabel
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
  }
};

export default Message;
