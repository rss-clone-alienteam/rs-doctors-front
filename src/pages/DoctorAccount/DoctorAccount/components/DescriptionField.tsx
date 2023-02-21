import { Box, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface IProps {
  caption: string;
  text?: string;
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
}

export function DescriptionField({ caption, text, icon }: IProps) {
  const Icon = icon;
  return (
    <Box sx={{ display: "flex", gap: 1, height: "55%" }}>
      <Icon color="primary" />
      <Typography color="primary">
        {caption}
      </Typography>
      <Typography>
        {text}
      </Typography>
    </Box>
  );
}
