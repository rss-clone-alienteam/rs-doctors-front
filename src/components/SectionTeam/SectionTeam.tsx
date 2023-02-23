import { Chip, Divider, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
// import team1pic from "../../assets/team1.png";
import style from "./SectionTeam.module.scss";
import { Box } from "@mui/system";

export const SectionTeam = () => {
  return (
    <Grid container className={style.container} spacing={2}>
      <Grid container className={style.card} spacing={2}>
        <Grid>
          <Box className={style.img}
            component="img"
            height="140"
            // src={team1pic}
            alt="ShArP"
          />
        </Grid>
        <Grid>
          <Typography gutterBottom variant="h5" color="text.secondary">
            testtesttest
          </Typography>
        </Grid>
        <Grid>
          <Divider className={style.divider}>
            <Chip label="testtesttesttest" variant="outlined" />
          </Divider>
        </Grid>
        <Grid>
          <Typography variant="body2" color="text.secondary">
            testtesttesttest
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="body2" color="text.secondary">
            testtesttest
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="body2" color="text.secondary">
            testtesttest
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};