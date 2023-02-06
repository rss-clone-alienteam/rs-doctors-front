import { Box, Grid, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface IProps {
  caption: string;
  text: string;
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
}

export function Benefit({ caption, text, icon }: IProps) {
  const Icon = icon;
  return (
    <Grid item xs={12} md={6} lg={3}>
      <Box sx={{ display: "flex", gap: 1, height: "55%" }}>
        <Icon color="primary" />
        <Typography color="primary" sx={{ width: "70%" }}>
          {caption}
        </Typography>
      </Box>

      <Typography
        fontSize="0.8rem"
        aria-describedby="card-description"
        mb={1}
        color="black"
      >
        {text}
      </Typography>
    </Grid>
  );
}
