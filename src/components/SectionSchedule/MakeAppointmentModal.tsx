import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation, useQuery, useQueryClient } from "react-query";
import { getPatient, IPatient, updatePatient } from "../../api/patients";
import { addSchedule, getSchedule, ISchedule, IAppointments } from "../../api/schedule";
import { Context } from "../../Context/Context";
import { showToastMessage } from "../../utils/showToastMessage";
import style from "./MakeAppointmentModal.module.scss";

interface IProps {
  close: () => void;
  update?:
    | ((options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined) => Promise<QueryObserverResult<ISchedule, unknown>>)
    | (<TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<unknown>>);
}

export const MakeAppointmentModal = ({ close, update }: IProps) => {
  const { userID } = useContext(Context);

  const { appointment } = useContext(Context);

  const { data: dataPatient } = useQuery<IPatient>("patient", () => getPatient(userID));
  const { data: scheduleDoctor } = useQuery<ISchedule>("schedule-doctor", () => getSchedule(appointment.doctor.id), {
    onError: () => {
      showToastMessage("Error during fetching schedule", "error");
    },
  });

  const clientQuery = useQueryClient();

  const mutationSchedule = useMutation((schedule: IAppointments) => addSchedule(schedule, appointment.doctor.id));

  const addAppointmentSchedule = () => {
    if (scheduleDoctor) {
      const schedule = scheduleDoctor.schedule;
      schedule[appointment.date][appointment.time] = userID;
      mutationSchedule.mutate(schedule);
    }
  };

  const makeAppointment = async () => {
    const patientAppointments = dataPatient?.appointments || [];

    const checkDuplicateAppointment = async () => {
      const body = [
        ...patientAppointments,
        {
          doctorID: appointment.doctor.id,
          doctorName: appointment.doctor.nameDoctor,
          doctorSurname: appointment.doctor.surname,
          day: appointment.date,
          time: appointment.time,
        },
      ].map((appointment) => appointment.doctorID);

      const checkDuplication = new Set(body);

      if (checkDuplication.size !== body.length) {
        showToastMessage("You already have an appointment with this doctor, please cancel the previous one!", "error");
        return false;
      }

      const data = await updatePatient(userID, {
        appointments: [
          ...patientAppointments,
          {
            doctorID: appointment.doctor.id,
            doctorName: appointment.doctor.nameDoctor,
            doctorSurname: appointment.doctor.surname,
            day: appointment.date,
            time: appointment.time,
          },
        ],
      });
      addAppointmentSchedule();
      showToastMessage("Success!", "success");

      clientQuery.invalidateQueries(["patient"]);
      return data;
    };
    checkDuplicateAppointment();
  };

  return (
    <Box className={style.container}>
      <Typography color="secondary">
        {`You are trying to make an appointment on ${appointment.date} at ${appointment.time}. Your doctor is ${appointment.doctor.nameDoctor} ${appointment.doctor.surname}`}
      </Typography>
      <Typography color="primary">Do you confirm your appointment?</Typography>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          makeAppointment();
          close();
          if (update) update();
        }}
      >
        Confirm
      </Button>
      <Button variant="contained" color="error" onClick={close}>
        Cancel
      </Button>
    </Box>
  );
};
