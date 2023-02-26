import { Box, Button, Card, CardActions, CardContent, CircularProgress, Divider, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Appointment, getPatient, IPatient, updatePatient } from "../../api/patients";
import { getSchedule, addSchedule, IAppointments } from "../../api/schedule";
import { LogOutBanner } from "../../components/LogOutBanner/LogOutBanner";
import { showToastMessage } from "../../utils/showToastMessage";
import style from "./PatientAccount.module.scss";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SettingsIcon from "@mui/icons-material/Settings";



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

  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { id } = useParams();

  const { data, isSuccess, isLoading, refetch: refetchPatient } = useQuery<IPatient>("patient", () => getPatient(id));

  const clientQuery = useQueryClient();

  const mutationPatient = useMutation(
    (body: Appointment[]) => updatePatient(id, {
      appointments: body
    }),
    {
      onSuccess: () => {
        refetchPatient();
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
    if (data) {
      const body = data.appointments.filter((appointment) => appointment.doctorID !== doctorID);
      mutationPatient.mutate(body);
      clientQuery.invalidateQueries(["patient"]);
      console.log("data", data, body);
      showToastMessage("You canceled appointment", "success");
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
          height: "fit-content"
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", minWidth: "min-content" }}
        >
          <Tab icon={<CalendarMonthIcon />} label="Appointments" {...a11yProps(0)} sx={{ fontSize: "10px" }} />
          <Tab icon={<SettingsIcon />} label="Settings" {...a11yProps(1)} sx={{ fontSize: "10px" }} />
          <Tab icon={<QuestionAnswerIcon />} label="Questions" {...a11yProps(2)} sx={{ fontSize: "10px" }} disabled />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Grid container spacing={2}>
            {data?.appointments.length === 0 && <Box color="black">You don&apos;t have appointments yet</Box>}
            {mutationPatient.isLoading || isLoading && <CircularProgress size={120} sx={{ position: "fixed", top: "45vh", left: "45vw" }} />}
            {isSuccess && data.appointments.map((appointment, i) =>
              <Grid item sx={{ color: "red", display: "flex", gap: 2 }} key={i}>
                <Card sx={{ cursor: "pointer" }} onClick={() => navigate(`/doctor/${appointment.doctorID}`)}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="secondary" gutterBottom>
                      Doctor: {appointment.doctorName} {appointment.doctorSurname}
                    </Typography>
                    <Typography variant="h5" component="div" color="secondary">
                      {appointment.day}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="primary">
                      at {appointment.time}
                    </Typography>
                    <Divider />
                  </CardContent>
                  <CardActions sx={{ flexDirection: "column", alignItems: "center", px: 2, paddingBottom: 2 }}>
                    <Typography color="error" sx={{ fontSize: 12, mb: 1, textAlign: "center" }}>
                      If your plans change,
                      <br />
                      please cancel the meeting
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAppointment(appointment.doctorID, appointment.day, appointment.time);
                      }}
                    >
                      Cancel
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Button variant="contained" color="error">Delete account</Button>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box sx={{ color: "red" }}> {data?.name}</Box>
        </TabPanel>
      </Box>
    </Box>
  );
};
