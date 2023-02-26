import { Box, Grid, Typography } from "@mui/material";
import style from "./AboutDoctor.module.scss";
import { IDoctor } from "../../../api/doctors";

interface AboutDoctorProp {
  data: IDoctor;
}

const AboutDoctor = ({ data }: AboutDoctorProp) => {
  return (
    <Box className={style.container}>
      <Grid container direction={"column"}>
        <Grid item mb={3} xs={12} className={style.containerTitle}>
          <Typography variant="body1" fontSize={22} color={"rgb(0 0 0)"} textAlign={"justify"}>
            About
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">{data.aboutMe}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export { AboutDoctor };
