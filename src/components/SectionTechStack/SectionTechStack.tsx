import { Box, Grid } from "@mui/material";
import style from "./SectionTechStack.module.scss";
import reactPNG from "../../assets/react_png.png";
import tsPNG from "../../assets/ts.png";
import muiPNG from "../../assets/mui.png";
import formPNG from "../../assets/form.png";
import queryPNG from "../../assets/query.png";
import Typography from "@mui/material/Typography";

export const SectionTechStack = () => {
  return (
    <Grid container className={style.container} spacing={2}>
      <Grid className={style.imageWrapper}>
        <Box component={"img"} src={reactPNG} className={style.image} />
        <Typography color="black">
          React
        </Typography>
      </Grid>
      <Grid className={style.imageWrapper}>
        <Box component={"img"} src={tsPNG} className={style.image} />
        <Typography color="black">
          Typescript
        </Typography>
      </Grid>
      <Grid className={style.imageWrapper}>
        <Box component={"img"} src={muiPNG} className={style.image} />
        <Typography color="black">
          Material UI
        </Typography>
      </Grid>
      <Grid className={style.imageWrapper}>
        <Box component={"img"} src={formPNG} className={style.image} />
        <Typography color="black">
          React-hook-form
        </Typography>
      </Grid>
      <Grid className={style.imageWrapper}>
        <Box component={"img"} src={queryPNG} className={style.image} />
        <Typography color="black">
          React-query
        </Typography>
      </Grid>

    </Grid>
  );
};