import React, { useContext, useState } from "react";
import style from "./CardDoctor.module.scss";
import Box from "@mui/material/Box";
import { Avatar, Card, CardContent, CardHeader, CircularProgress, Grid, Link, Rating, Snackbar, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { IDoctor } from "../../api/doctors";
import { getSchedule } from "../../api/schedule";
import { SectionSchedule } from "../SectionSchedule/SectionSchedule";
import { useQuery, useQueryClient } from "react-query";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { getPatient, IPatient, updatePatient } from "../../api/patients";
import { Context } from "../../Context/Context";
import { Alert } from "@mui/lab";

interface DoctorProps {
  doctor: IDoctor;
  coords: [number, number];
}

export const CardDoctor = ({ doctor, coords }: DoctorProps) => {
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

  const { data: dataPatient } = useQuery<IPatient>("patient", () => getPatient(userID));

  const clientQuery = useQueryClient();

  const makeAppointment = async (day: string, time: string) => {
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
        doctorID: doctor.id,
        doctorName: doctor.nameDoctor,
        day: day,
        time: time
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
          doctorID: doctor.id,
          doctorName: doctor.nameDoctor,
          day: day,
          time: time
        }]
      });
      clientQuery.invalidateQueries(["patient"]);
      handleClick();
      return data;
    };
    checkDuplicateAppointment();
  };

  const { isLoading, data } = useQuery("schedule", () => getSchedule(doctor.id));

  return (
    <Box className={style.container}>
      <Grid container>
        <Grid item container xs={6}>
          <Grid item>
            <Card sx={{ boxShadow: "none" }}>
              <CardHeader
                avatar={<Avatar alt="complex" src={doctor.photo || "../../assets/default-avatar.png"} sx={{ width: 65, height: 65 }} />}
                sx={{ cursor: "pointer", fontSize: "31px" }}
                // title={`${doctor.nameDoctor} ${doctor.surname}`}
                title={
                  <Typography variant="body2" color="black" fontSize="17px">
                    {`${doctor.nameDoctor} ${doctor.surname}`}
                  </Typography>
                }
                subheader={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {doctor.category}
                    </Typography>
                    <Grid container>
                      <Grid item>
                        <Rating name="read-only" value={5} readOnly />
                      </Grid>
                      <Grid item className={style.avatarFeedback}>
                        <Box component="span" sx={{ color: "red" }}>
                          !!!!!Amount
                        </Box>
                        Feedback
                      </Grid>
                    </Grid>
                  </>
                }
                onClick={() => navigate(`/doctor/${doctor.id}`)}
              />
              <CardContent>
                <Grid container direction="column" spacing={2}>
                  <Grid item container direction="row" flexWrap="nowrap">
                    <Grid item className={style.infoMapIconContainer} mr={1}>
                      <LocationOnIcon className={style.infoMapIcon} />
                    </Grid>
                    <Grid item container direction="column" alignItems="flex-start">
                      <Grid item container direction="row">
                        <Grid item marginRight="7px">
                          <Typography className={style.addressJob}>{doctor.address}</Typography>
                        </Grid>
                        <Grid item>
                          {coords && (
                            <Link href={`https://yandex.ru/maps/?whatshere[point]=${coords[1]},${coords[0]}&whatshere[zoom]=17`} underline="hover">
                              Map
                            </Link>
                          )}
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2"> {doctor.experience}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item container direction="row" flexWrap="nowrap">
                    <Grid item className={style.infoMapIconContainer} mr={1}>
                      <MedicalServicesIcon className={style.infoMapIcon} />
                    </Grid>
                    <Grid item container direction="column" alignItems="flex-start">
                      <Grid item>
                        <Typography>{`${doctor.services[0].name} • ${doctor.services[0].price}`}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={6} sx={{ width: "50%", height: "300px", overflow: "scroll", position: "relative" }}>
          {isLoading && <CircularProgress size={80} sx={{ position: "absolute", top: "40%", left: "45%" }} />}
          {data !== undefined && <SectionSchedule data={data.schedule} onClick={makeAppointment} key={data.id} doctor={doctor.nameDoctor} />}
          <Snackbar
            open={open}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            onClose={handleClose}
          >
            {alert ? (<Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>{errorMessage}</Alert>)
              : (<Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>Success</Alert>)}
          </Snackbar>
        </Grid>
      </Grid>
    </Box>
  );
};
