
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { getPatient, IPatient, updatePatient } from "../../api/patients";
import { addSchedule, getSchedule, ISchedule, IAppointments } from "../../api/schedule";
import { Context } from "../../Context/Context";

interface IProps {
  close: () => void
}

export const MakeAppointmentModal = ({ close }: IProps) => {

  const navigate = useNavigate();

  const { userID, isUserLogIn } = useContext(Context);

  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };


  const { appointment } = useContext(Context);

  const { data: dataPatient } = useQuery<IPatient>("patient", () => getPatient(userID));
  const { data: scheduleDoctor } =
    useQuery<ISchedule>("schedule-doctor", () => getSchedule(appointment.doctor.id), {
      onError: () => {
        setErrorMessage("Error during fetching schedule");
        setAlert(true);
        handleClick();
      }
    });

  const clientQuery = useQueryClient();

  const mutationSchedule = useMutation(
    (schedule: IAppointments) => addSchedule(schedule, appointment.doctor.id),
  );

  const addAppointmentSchedule = () => {
    if(scheduleDoctor) {
      const schedule = scheduleDoctor.schedule;
      schedule[appointment.date][appointment.time] = userID;
      mutationSchedule.mutate(schedule);
    }
  };

  const makeAppointment = async () => {
    console.log(dataPatient?.appointments);
    const patientAppointments = dataPatient?.appointments || [];
    console.log(patientAppointments);

    if (!isUserLogIn) {
      setErrorMessage("Please sign in");
      setAlert(true);
      handleClick();
      setTimeout(() => {
        navigate("/auth/sign-in");
      }, 1000);
      return;
    }

    console.log(patientAppointments);

    const checkDuplicateAppointment = async () => {
      const body = [...patientAppointments, {
        doctorID: appointment.doctor.id,
        doctorName: appointment.doctor.nameDoctor,
        day: appointment.date,
        time: appointment.time
      }]
        .map((appointment) => appointment.doctorID);

      const checkDuplication = new Set(body);

      if (checkDuplication.size !== body.length) {
        setAlert(true);
        setErrorMessage("Please cancel appointment before make the new one!");
        handleClick();
        return false;
      }
      console.log("goes");
      const data = await updatePatient(userID, {
        appointments: [...patientAppointments, {
          doctorID: appointment.doctor.id,
          doctorName: appointment.doctor.nameDoctor,
          day: appointment.date,
          time: appointment.time
        }]
      });
      clientQuery.invalidateQueries(["patient"]);
      handleClick();
      return data;
    };
    checkDuplicateAppointment();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "red" }}>
      <Typography>{`You are trying to make an appointment on ${appointment.date} at ${appointment.time}. Your doctor is ${appointment.doctor.nameDoctor}`}</Typography>
      <Typography>Do you confirm your appointment?</Typography>
      <Button variant="contained" color="success" onClick={() => {
        addAppointmentSchedule();
        makeAppointment();
        setTimeout(() => {
          close();
        }, 1500);

      }
      }>Confirm</Button>
      <Button variant="contained" color="error" onClick={close}>Cancel</Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleClose}
      >
        {alert ? (<Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>{errorMessage}</Alert>)
          : (<Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>Success</Alert>)}
      </Snackbar>
    </Box>
  );
};
