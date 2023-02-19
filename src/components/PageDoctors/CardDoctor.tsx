import React from "react";
import style from "./CardDoctor.module.scss";
import Box from "@mui/material/Box";
import { Avatar, Card, CardContent, CardHeader, CircularProgress, Grid, Link, Rating, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { IDoctor } from "../../api/doctors";
import { getSchedule } from "../../api/schedule";
import { SectionSchedule } from "../SectionSchedule/SectionSchedule";
import { useQuery } from "react-query";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

interface DoctorProps {
  doctor: IDoctor;
  coords: [number, number];
}

export const CardDoctor = ({ doctor, coords }: DoctorProps) => {
  const navigate = useNavigate();

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
                        <Typography>{doctor.servicesSector}</Typography>
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
          {data !== undefined && <SectionSchedule data={data.schedule} onClick={() => console.log("12300")} key={data.id} />}
        </Grid>
      </Grid>
    </Box>
  );
};
