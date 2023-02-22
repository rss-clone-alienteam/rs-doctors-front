
import { Box, Button, Typography } from "@mui/material";
import { Appointment } from "../../api/patients";

interface IProps {
  actionFunc: (day: string, time: string) => Promise<Appointment | undefined | void> | void
  date: string;
  time: string;
  doctor: string;
  close: () => void
}

export const MakeAppointmentModal = ({ actionFunc, date, time, doctor, close }: IProps) => {
  console.log(date, time);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "red" }}>
      <Typography>{`You are trying to make an appointment on ${date} at ${time}. Your doctor is ${doctor}`}</Typography>
      <Typography>Do you confirm your appointment?</Typography>
      <Button variant="contained" color="success" onClick={() => {
        actionFunc(date, time);
        close();
      }
      }>Confirm</Button>
      <Button variant="contained" color="error" onClick={close}>Cancel</Button>
    </Box>
  );
};
