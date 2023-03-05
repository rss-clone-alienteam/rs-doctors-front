import { Box, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import style from "./Benefit.module.scss";

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
    <Box className={style.container}>
      <Box className={style.topContainer}>
        <Icon color="primary" />
        <Typography color="primary" >
          {caption}
        </Typography>
      </Box>

      <Typography
        fontSize="0.8rem"
        aria-describedby="card-description"
        mb={1}
        color="secondary"
      >
        {text}
      </Typography>
    </Box>
  );
}
