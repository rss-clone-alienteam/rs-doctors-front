import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import style from "./ReviewsDoctor.module.scss";
import { IDoctor } from "../../../api/doctors";
import { ReviewCard } from "./ReviewCard";

interface ReviewsDoctorProps {
  data: IDoctor;
}

const ReviewsDoctor = ({ data }: ReviewsDoctorProps) => {
  return (
    <Box color={"black"} maxHeight="70vh" sx={{ overflow: "scroll" }}>
      <Grid container direction={"column"}>
        <Grid item mb={3} xs={12} className={style.containerTitle}>
          <Typography variant="body1" fontSize={22} color={"rgb(0 0 0)"}>
            Reviews
          </Typography>
        </Grid>
        <Grid item container direction="column" spacing={2} height={"auto"}>
          {data.reviews &&
            data.reviews.map((item, index) => (
              <Grid item xs={12} key={`${data.id}${index}`} p={2} ml={1}>
                <ReviewCard review={item} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export { ReviewsDoctor };
