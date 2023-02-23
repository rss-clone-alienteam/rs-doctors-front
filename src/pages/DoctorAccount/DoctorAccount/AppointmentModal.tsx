import { Box, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { IAppointments } from "../../../api/schedule";
import { IPatient } from "../../auth/SignUp/SignUpPatient";
import { getPatient } from "../../../api/patients";

export const AppointmentModal = ({ data, dateTime }: {data: IAppointments, dateTime: string}) => {

  const date = dateTime.slice(0, dateTime.lastIndexOf("-"));
  const time = dateTime.slice(dateTime.lastIndexOf("-") + 1);

  const idPatient = data[date][time];

  // const { data: patient, isLoading: isLoadingPatient } =
  //   useQuery<IPatient, Error>(["patient", idPatient], () => getPatient(idPatient), {
  //     // onError: () => {
  //     //   setAlert({ severity: "error", message: "Error during fetching data" });
  //     // }
  //   });

  return (
    <Box>
      {/* <Typography>{`Patient data: ${}`}</Typography> */}
    </Box>
  );
};
