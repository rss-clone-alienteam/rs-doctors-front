import { Box } from "@mui/material";
import { useQuery } from "react-query";
import { IAppointments } from "../../../api/schedule";
import { getPatient } from "../../../api/patients";
import CircularProgress from "@mui/material/CircularProgress";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonthRounded";
import EmojiPeople from "@mui/icons-material/EmojiPeople";
import AddAlarm from "@mui/icons-material/AddAlarm";
import ContactMail from "@mui/icons-material/ContactMail";
import { DescriptionField } from "./components/DescriptionField";

export const AppointmentModal = ({ data, dateTime }: {data: IAppointments, dateTime: string}) => {

  const date = dateTime.slice(0, dateTime.lastIndexOf("-"));
  const time = dateTime.slice(dateTime.lastIndexOf("-") + 1);

  const idPatient = data[date][time];

  const { data: patient, isLoading: isLoadingPatient } =
    useQuery(["patient", idPatient], () => getPatient(idPatient as string), {
      enabled: !!idPatient,
      // onError: () => {
      //   setAlert({ severity: "error", message: "Error during fetching data" });
      // }
    });

  return (
    <>
      {isLoadingPatient ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{color: "black"}}>
          <DescriptionField icon={CalendarMonthIcon} caption={"Date"} text={date} />
          <DescriptionField icon={AddAlarm} caption={"Time"} text={time} />
          <DescriptionField icon={EmojiPeople} caption={"Patient information:"} text={`${patient?.name} ${patient?.lastName}`} />
          <DescriptionField icon={ContactMail} caption={"Contact Information:"} text={patient?.email} />
        </Box>
      )}
    </>
  );
};
