import * as React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";

interface IProps {
  caption: string;
  text: string;
  iconClassName: string;
}

export function Benefit({ caption, text, iconClassName }: IProps) {
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 250,
        gap: 2,
      }}
    >
      <i
        className={iconClassName}
        style={{ color: "#3ab2e4", fontSize: "2rem" }}
      ></i>
      <div>
        <Typography
          level="h2"
          fontSize="lg"
          id="card-description"
          mb={0.5}
          style={{ color: "#3ab2e4" }}
        >
          {caption}
        </Typography>
        <Typography
          fontSize="0.8rem"
          aria-describedby="card-description"
          mb={1}
        >
          {text}
        </Typography>
      </div>
    </Card>
  );
}
