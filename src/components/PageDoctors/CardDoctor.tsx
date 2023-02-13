import React from "react";
import Box from "@mui/material/Box";
import { Avatar, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Link, Rating, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { IDoctor } from "../../api/doctors";

interface DoctorProps {
  doctor: IDoctor;
}

export const CardDoctor = ({ doctor }: DoctorProps) => {
  const navigate = useNavigate();

  return (
    <Box display={"flex"}>
      <Grid container justifyContent="center" alignItems="center" direction="column" spacing={1} sx={{ width: "100%" }}>
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
              sx={{ cursor: "pointer" }}
              title={`${doctor.name} ${doctor.surname}`}
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
              <Grid container mb={1} alignItems="center" display={"flex"} flexWrap={"nowrap"}>
                <Grid item width={"20px"} mr={"5px"}>
                  <LocationOnIcon sx={{ display: "flex", alignItems: "center" }} />
                </Grid>
                <Grid item mr={1}>
                  <Typography>{doctor.address}</Typography>
                </Grid>
                <Grid item>
                  <Link href="#" underline="hover">
                    Map
                  </Link>
                  {/* <Box
                    onClick={() => {
                      console.log("13333");
                      getMap();
                    }}
                  >
                    Click me
                  </Box> */}
                </Grid>
              </Grid>

              <Grid container mb={1} display={"flex"} flexWrap={"nowrap"}>
                {/* <Grid item width={"20px"} mr={"5px"}>
                  <LocationOnIcon sx={{ display: "flex", alignItems: "center" }} />
                </Grid> */}
                <Grid item ml={"25px"}>
                  <Typography variant="body2"> {doctor.experience}</Typography>
                </Grid>
              </Grid>

              {/* <Grid container mb={1} alignItems="center">
                <Grid item xs={0.3}></Grid>
                <Grid item mr={1} ml={1}>
                  {doctor.experience}
                </Grid>
                <Grid item display={"flex"} justifyContent={"end"}>
                  {`${doctor.servicesSector} - ${doctor.price}`}
                </Grid>
              </Grid> */}
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
