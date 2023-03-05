import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { CaptionText } from "./CaptionText/CaptionText";
import { Search } from "./Search/Search";
import style from "./SectionFindDoctors.module.scss";

export const SectionFindDoctors = () => {
  return (
    <Grid container className={style.container}>
      <Box className={style.leftContainer}>
        <CaptionText />
        <Search />
      </Box>
    </Grid>
  );
};
