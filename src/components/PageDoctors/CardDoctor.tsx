import style from "./FindDoctors.module.scss";
import React from "react";
import Box from "@mui/material/Box";
import { Avatar, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Link, Rating, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { log } from "console";

export interface IDoctor {
  aboutMe: string | null;
  address: string | null;
  category: string | null;
  city: string | null;
  education: string | null;
  email: string | null;
  experience: null;
  id: string | null;
  languages: null;
  name: string | null;
  paymentMethod: string | null;
  phone: string | null;
  price: string | null;
  servicesSector: string | null;
  surname: string | null;
}

interface DoctorProps {
  doctor: IDoctor;
}

export const CardDoctor = ({ doctor }: DoctorProps) => {
  const navigate = useNavigate();

  // function selectDoc(doctor: IDoctor) {
  //   console.log(doctor);

  //   navigate(`/doctor/${doctor.name}`);
  // }

  return (
    <Box display={"flex"}>
      <Grid container justifyContent="center" alignItems="center" direction="column" spacing={1} sx={{ width: "50%" }}>
        <Grid item>
          <Card sx={{ maxWidth: "100%" }}>
            <CardHeader
              avatar={
                <Avatar
                  alt="complex"
                  src="https://i.pinimg.com/originals/ba/1e/dc/ba1edc6334faa704c42f69a0a77bdf84.jpg"
                  sx={{ width: 56, height: 56 }}
                />
              }
              title={`${doctor.name} ${doctor.name}`}
              subheader={
                <>
                  <Typography variant="body2" color="text.secondary">
                    {doctor.category}
                  </Typography>
                  <Grid container>
                    <Grid item>
                      <Rating name="read-only" value={5} readOnly />
                    </Grid>
                    <Grid item>
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
              <Grid container mb={1} alignItems="center">
                <Grid item xs={0.3}>
                  <LocationOnIcon sx={{ display: "flex", alignItems: "center" }} />
                </Grid>
                <Grid item mr={1} ml={1}>
                  {doctor.address}
                </Grid>
                <Grid item>
                  <Link href="#" underline="hover">
                    Map
                  </Link>
                </Grid>
              </Grid>
              <Grid container mb={1}>
                <Grid item xs={0.3} />
                <Grid item mr={1} ml={1} color={"red"}>
                  !!!name fo hospital
                </Grid>
              </Grid>
              <Grid container mb={1} alignItems="center">
                <Grid item xs={0.3}></Grid>
                <Grid item mr={1} ml={1} color={"red"}>
                  !!!services
                </Grid>
                <Grid item display={"flex"} justifyContent={"end"}>
                  {`From ${doctor.price}`}
                </Grid>
              </Grid>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with
                the mussels, if you like.
              </Typography>
            </CardContent>

            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">{/* <FavoriteIcon /> */}</IconButton>
              <IconButton aria-label="share">{/* <ShareIcon /> */}</IconButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Typography color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the
            mussels, if you like.
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ width: "50%", height: "300px", backgroundColor: "#d8e0f8" }}></Box>
    </Box>
  );
};
