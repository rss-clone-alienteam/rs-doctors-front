import { Box } from "@mui/system";
import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";

const ReviewsDoctor = () => {
  return (
    <Box color={"black"}>
      <Box component={"div"}>Reviews</Box>

      <Grid container direction="column">
        <Grid item>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "black" }} aria-label="recipe">
                  R
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
    </Box>
  );
};

export { ReviewsDoctor };
