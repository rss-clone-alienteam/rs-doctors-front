import { Box } from "@mui/material";
import style from "./CaptionText.module.scss";

export const CaptionText = () => {
  return (
    <Box className={style.container}>
      <Box component="span" className={style.topText}>
        Find the doctor{" "}
      </Box>
      <Box component="span" className={style.bottomText}>
        and make an appointment
      </Box>
    </Box>
  );
};
