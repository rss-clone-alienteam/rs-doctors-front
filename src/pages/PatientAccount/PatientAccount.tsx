import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
} from "@mui/material";
import { useState, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Appointment, getPatient, IPatient, updatePatient, deletePatient } from "../../api/patients";
import { getSchedule, addSchedule, IAppointments } from "../../api/schedule";
import { LogOutBanner } from "../../components/LogOutBanner/LogOutBanner";
import { showToastMessage } from "../../utils/showToastMessage";
import style from "./PatientAccount.module.scss";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SettingsIcon from "@mui/icons-material/Settings";
import { Context } from "../../Context/Context";

interface IDataSchedule {
  schedule: IAppointments
  id: string,
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const PatientAccount = () => {
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
            <Box>{children}</Box>
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

  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  const { setIsUserLogIn, setProfile } = useContext(Context);

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
        clientQuery.invalidateQueries(["patient"]);
        showToastMessage("You canceled appointment", "success");
      },
      onError: () => console.log("Something goes wrong, try again!"),
    }
  );

  const mutationSchedule = useMutation(
    (data: IDataSchedule) => addSchedule(data.schedule, data.id),
  );

  const mutationDeleteAccount = useMutation(
    async () => {
      await deletePatient(id);
    },
    {
      onSuccess: () => {
        setIsUserLogIn(false);
        setProfile("");
        navigate("/");
      },
      onError: () => {
        showToastMessage("Something goes wrong, please try again", "error");
      }
    }
  );

  const deleteAppointment = async (doctorID: string, day: string, time: string) => {
    const scheduleDoctor = await getSchedule(doctorID);
    scheduleDoctor.schedule[day][time] = null;
    mutationSchedule.mutate({
      schedule: scheduleDoctor.schedule,
      id: doctorID,
    });
    if (data) {
      const body = data.appointments.filter((appointment) => appointment.doctorID !== doctorID);
      mutationPatient.mutate(body);
    }
  };

  const deleteAccount = () => {
    mutationDeleteAccount.mutate();
  };

  return (
    <>
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContent: "space-between" }}>
                  <Typography sx={{ width: "85px" }} color="secondary">Name:</Typography>
                  <Chip variant="outlined" label={data?.name} />
                </Box>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContent: "space-between" }}>
                  <Typography sx={{ width: "85px" }} color="secondary">Last name:</Typography>
                  <Chip variant="outlined" label={data?.lastName} />
                </Box>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContent: "space-between" }}>
                  <Typography sx={{ width: "85px" }} color="secondary">Your city:</Typography>
                  <Chip variant="outlined" label={data?.city} />
                </Box>
                <Divider />
              </Box>
              <Button variant="contained" color="error" onClick={openDialog}>Delete account</Button>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box sx={{ color: "red" }}> {data?.name}</Box>
          </TabPanel>
        </Box >
      </Box >
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure that you want to delete account
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"It's unchangeable operation"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Disagree</Button>
          <Button onClick={deleteAccount} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
