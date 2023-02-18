import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

interface IDateTime {
  label: string;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
}

export const BasicDatePicker = ({label, value, onChange} : IDateTime) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} required>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export const BasicTimePicker = ({label, value, onChange} : IDateTime) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} required>
      <TimePicker
        ampm={false}
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
