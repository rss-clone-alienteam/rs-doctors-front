import { Box } from "@mui/material";
import style from "./CaptionText.module.scss";

export const CaptionText = () => {
  return (
    <Box className={style.container}>
      <Box component="span" style={{ fontSize: "5rem" }}>
        Find the doctor{" "}
      </Box>
      <Box component="span" style={{ fontSize: "3rem" }}>
        and make an appointment
      </Box>
    </Box>
  );
};
