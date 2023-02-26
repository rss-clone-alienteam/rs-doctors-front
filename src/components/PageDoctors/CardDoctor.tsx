import { useContext } from "react";
import style from "./CardDoctor.module.scss";
import Box from "@mui/material/Box";
import { Avatar, Card, CardContent, CardHeader, CircularProgress, Grid, Link, Rating, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { IDoctor, IReview } from "../../api/doctors";
import { getSchedule } from "../../api/schedule";
import { SectionSchedule } from "../SectionSchedule/SectionSchedule";
import { useQuery } from "react-query";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { Context } from "../../Context/Context";
import { showToastMessage } from "../../utils/showToastMessage";

interface DoctorProps {
  doctor: IDoctor;
  coords: [number, number];
  modalHandler: (val: boolean) => void;
}

export const CardDoctor = ({ doctor, coords, modalHandler }: DoctorProps) => {
  const navigate = useNavigate();

  const { isLoading, data } = useQuery(`schedule-${doctor.id}`, () => getSchedule(doctor.id));
  const { setAppointment, isUserLogIn, profile } = useContext(Context);

  const clickHandler = (date: string, time: string) => {
    if (!isUserLogIn) {
      showToastMessage("Please sign in", "error");
      navigate("/auth/sign-in");
      return;
    }
    if (profile === "doctor") {
      showToastMessage("Please register as a patient", "error");
      return;
    }
    if (data?.schedule[date][time] === null) {
      setAppointment({
        doctor,
        date,
        time,
      });
      modalHandler(true);
    } else {
      showToastMessage("Sorry, this time is already taken", "error");
    }
  };

  return (
    <Box className={style.container}>
      <Grid container>
        <Grid item container xs={6}>
          <Grid item>
            <Card sx={{ boxShadow: "none" }}>
              <CardHeader
                avatar={
                  <Avatar
                    alt="complex"
                    src={doctor.photo || "../../assets/default-avatar.png"}
                    sx={{ width: 65, height: 65 }}
                    onClick={() => navigate(`/doctor/${doctor.id}`)}
                  />
                }
                sx={{ cursor: "pointer", fontSize: "31px" }}
                title={
                  <Typography variant="body2" color="black" fontSize="17px" onClick={() => navigate(`/doctor/${doctor.id}`)}>
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
                        <Rating
                          name="read-only"
                          precision={0.5}
                          value={
                            doctor.reviews
                              ? Number(doctor.reviews?.map((item: IReview) => item.rating).reduce((item, acc) => Number(item) + Number(acc), 0)) /
                                doctor.reviews.length
                              : 0
                          }
                          readOnly
                        />
                      </Grid>
                      {doctor.reviews && (
                        <Grid item container className={style.avatarFeedback} ml={1}>
                          <Grid item mr={0.5}>
                            <Link underline="hover" onClick={() => navigate(`/doctor/${doctor.id}/3`)}>
                              {`${doctor.reviews.length} Feedback`}
                            </Link>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </>
                }
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
        <Grid item xs={6} sx={{ height: "300px", overflow: "scroll", position: "relative" }}>
          {isLoading && <CircularProgress size={80} sx={{ position: "absolute", top: "40%", left: "45%" }} />}
          {data !== undefined && (
            <SectionSchedule data={data.schedule} onClick={() => modalHandler(true)} onClickAppointment={clickHandler} key={data.id} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
