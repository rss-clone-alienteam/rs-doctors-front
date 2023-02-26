import { Box } from "@mui/material";

import Typography from "@mui/material/Typography";
import { TECHNOLOGIES } from "../../constants/tech/TECH";

export const SectionTechStack = () => {

  const techs = TECHNOLOGIES.map((tech) => (
    <Box
      key={tech.name}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        borderRadius: 50,
        py: 1,
        px: 2,
        bgcolor: "#fafafa",
      }}
    >
      <Box component="img" src={tech.image} alt={tech.name} sx={{ width: 40 }} />
      <Typography color="secondary">
        {tech.name}
      </Typography>
    </Box>
  ));

  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", px: 2, py: 6 }}>{techs}</Box>
  );
};
