import { Box, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { IAppointments } from "../../../api/schedule";
import { getPatient } from "../../../api/patients";
import CircularProgress from "@mui/material/CircularProgress";

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

  console.log(patient);

  return (
    <>
      {isLoadingPatient ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{color: "black"}}>
          <Typography>{`Date: ${date}`}</Typography>
          <Typography>{`Time: ${time}`}</Typography>
          <Typography>{`Patient data: ${patient?.name} ${patient?.lastName}`}</Typography>
          <Typography>{`Contact details: ${patient?.email}`}</Typography>
        </Box>
      )}
    </>
  );
};
