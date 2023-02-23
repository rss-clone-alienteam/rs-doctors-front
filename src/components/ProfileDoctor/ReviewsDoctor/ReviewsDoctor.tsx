import { Box } from "@mui/system";
import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import style from "./ReviewsDoctor.module.scss";
import { IDoctor } from "../../../api/doctors";

interface ReviewsDoctorProps {
  data: IDoctor;
}

const ReviewsDoctor = ({ data }: ReviewsDoctorProps) => {
  const getRandomColor = () => "#" + (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase();
  console.log(data);

  return (
    <Box color={"black"}>
      <Grid container direction={"column"}>
        <Grid item mb={3} xs={12} className={style.containerTitle}>
          <Typography variant="body1" fontSize={22} color={"rgb(0 0 0)"}>
            Reviews
          </Typography>
        </Grid>
        <Grid item container direction="column">
          <Grid item xs={12}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: getRandomColor() }} aria-label="recipe">
                    {/* {data.reviews} */}
                  </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with
                  the mussels, if you like.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export { ReviewsDoctor };
