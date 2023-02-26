import { Chip, Divider, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import team1pic from "../../assets/team1.png";
import team2pic from "../../assets/team2.png";
import team3pic from "../../assets/team3.png";
import style from "./SectionTeam.module.scss";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export const SectionTeam = () => {
  return (
    <Grid container className={style.container}>
      <Link to={"https://github.com/ShArPman13"}>
        <Grid container className={style.card} spacing={2}>
          <Grid sx={{ display: "flex", justifyContent: "center" }}>
            <Box className={style.img}
              component="img"
              height="140"
              src={team1pic}
              alt="ShArP"
            />
          </Grid>
          <Grid>
            <Typography gutterBottom variant="h5" color="text.secondary" sx={{ display: "flex", justifyContent: "center" }}>
              Alexey
            </Typography>
          </Grid>
          <Grid>
            <Divider className={style.divider}>
              <Chip label="Main contribution" variant="outlined" />
            </Divider>
          </Grid>
          <Grid container className={style.bottomText}>
            <Grid>
              <Typography variant="body2" color="text.secondary">
                Main page
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body2" color="text.secondary">
                Patient profile
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body2" color="text.secondary">
                Authorization
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Link>
      <Link to={"https://github.com/shutikate"}>
        <Grid container className={style.card} spacing={2}>
          <Grid sx={{ display: "flex", justifyContent: "center" }}>
            <Box className={style.img}
              component="img"
              height="140"
              src={team2pic}
              alt="ShArP"
            />
          </Grid>
          <Grid>
            <Typography gutterBottom variant="h5" color="text.secondary" sx={{ display: "flex", justifyContent: "center" }}>
              Katsiaryna
            </Typography>
          </Grid>
          <Grid>
            <Divider className={style.divider}>
              <Chip label="Main contribution" variant="outlined" />
            </Divider>
          </Grid>
          <Grid container className={style.bottomText}>
            <Grid>
              <Typography variant="body2" color="text.secondary">
                Back-end
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body2" color="text.secondary">
                Doctor profile
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body2" color="text.secondary">
                Authorization
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Link>
      <Link to={"https://github.com/gutsstas"}>
        <Grid container className={style.card} spacing={2}>
          <Grid sx={{ display: "flex", justifyContent: "center" }}>
            <Box className={style.img}
              component="img"
              height="140"
              src={team3pic}
              alt="ShArP"
            />
          </Grid>
          <Grid>
            <Typography gutterBottom variant="h5" color="text.secondary" sx={{ display: "flex", justifyContent: "center" }}>
              Stanislau
            </Typography>
          </Grid>
          <Grid>
            <Divider className={style.divider}>
              <Chip label="Main contribution" variant="outlined" />
            </Divider>
          </Grid>
          <Grid container className={style.bottomText}>
            <Grid>
              <Typography variant="body2" color="text.secondary">
                Search doctors
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body2" color="text.secondary">
                Doctor card
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body2" color="text.secondary">
                Filters & map
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Link>
    </Grid>

  );
};