import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";

interface IProps {
  placeholder: string;
  options: string[];
  value: string;
  onChange: (event: SelectChangeEvent) => void
}

export const SelectInput: FC<IProps> = ({ placeholder, options, onChange, value }) => {

  return (
    <Box sx={{ minWidth: 270, backgroundColor: "white" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={placeholder}
          onChange={onChange}
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
