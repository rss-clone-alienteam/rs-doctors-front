import { Box } from "@mui/material";

export const CaptionText = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "max-content",
        fontFamily: "Roboto",
        fontWeight: 700,
        color: "#6bc1d0",
        lineHeight: 0.9,
      }}
    >
      <Box component="span" style={{ fontSize: "5rem" }}>
        Find the doctor{" "}
      </Box>
      <Box component="span" style={{ fontSize: "3rem" }}>
        and make an appointment
      </Box>
    </Box>
  );
};
