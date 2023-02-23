import { Box, Button, CircularProgress, Tab, Tabs, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Appointment, getPatient, IPatient, updatePatient } from "../../api/patients";
import { getSchedule, addSchedule, IAppointments } from "../../api/schedule";
import { LogOutBanner } from "../../components/LogOutBanner/LogOutBanner";
import { Context } from "../../Context/Context";
import style from "./PatientAccount.module.scss";

interface IDataSchedule {
  schedule: IAppointments
  id: string,
}

export const PatientAccount = () => {

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { userID } = useContext(Context);
  const { data, isSuccess } = useQuery<IPatient>("patient", () => getPatient(userID));

  const clientQuery = useQueryClient();

  const mutationPatient = useMutation(
    (body: Appointment[]) => updatePatient(userID, {
      appointments: body
    }),
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(["patient"]);
      },
      onError: () => console.log("Something goes wrong, try again!"),
    }
  );

  const mutationSchedule = useMutation(
    (data: IDataSchedule) => addSchedule(data.schedule, data.id),
  );

  const deleteAppointment = async (doctorID: string, day: string, time: string) => {
    const scheduleDoctor = await getSchedule(doctorID);
    scheduleDoctor.schedule[day][time] = null;
    console.log(scheduleDoctor.schedule);
    mutationSchedule.mutate({
      schedule: scheduleDoctor.schedule,
      id: doctorID,
    });
    if(data) {
      const body = data.appointments.filter((appointment) => appointment.doctorID !== doctorID);
      mutationPatient.mutate(body);
    }
  };

  return (
    <Box className={style.containerTop}>
      <LogOutBanner />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Appointments" {...a11yProps(0)} />
          <Tab label="Questions" {...a11yProps(1)} />
          <Tab label="Settings" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0} >
          <Box sx={{ color: "red", display: "flex", flexDirection: "column", gap: 3 }}>
            {data?.appointments.length === 0 && <Box>You don&apos;t have appointments yet</Box>}
            {mutationPatient.isLoading && <CircularProgress size={120} sx={{ position: "fixed", top: "45vh", left: "45vw" }} />}
            {isSuccess && data.appointments.map((appointment, i) =>
              <Box sx={{ color: "red", display: "flex", gap: 2 }} key={i}>
                <Chip label={`${appointment.doctorName}`} color="primary" />
                <Chip label={`${appointment.day}`} color="success" />
                <Chip label={`${appointment.time}`} color="success" />
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteAppointment(appointment.doctorID, appointment.day, appointment.time)}
                >
                  Cancel
                </Button>
              </Box>
            )}

          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box sx={{ color: "red" }}>{data?.email}</Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box sx={{ color: "red" }}> {data?.name}</Box>
        </TabPanel>
      </Box >
    </Box >
  );
};
