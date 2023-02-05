import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

interface IProps {
  placeholder: string;
  options: string[];
}

export default function SelectInput({ placeholder, options }: IProps) {
  const [text, setText] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setText(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 270, backgroundColor: "white" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={text}
          label={placeholder}
          onChange={handleChange}
        >
          {options.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
