import style from "./ServicesDoctor.module.scss";
import { Box } from "@mui/joy";
import { Grid, Typography } from "@mui/material";
import { IDoctor } from "../../../api/doctors";

interface ServicesDoctorProps {
  data: IDoctor;
}

const ServicesDoctor = ({ data }: ServicesDoctorProps) => {
  return (
    <Box className={style.container}>
      <Grid container direction={"column"}>
        <Grid item mb={3} xs={12} className={style.containerTitle}>
          <Typography variant="body1" fontSize={22} color={"rgb(0 0 0)"}>
            Services and prices
          </Typography>
        </Grid>
        <Grid item container direction="column" justifyContent="flex-start">
          {data.services.map((item: { name: string; price: string }, index: number) => (
            <Grid item className={style.service} key={`${data.id}${index}`} mb={2}>
              {`${item.name} • ${item.price}`}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export { ServicesDoctor };
