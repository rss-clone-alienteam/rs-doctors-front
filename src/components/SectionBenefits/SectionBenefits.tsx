import { Grid } from "@mui/material";
import { Benefit } from "./Benefit/Benefit";
import SearchIcon from "@mui/icons-material/Search";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import style from "./SectionBenefits.module.scss";

export const SectionBenefits = () => {
  return (
    <Grid container className={style.container}>
      <Benefit
        caption={"Search Specialists"}
        text={
          "Choose among above 1000 specialists. Find out the opinions of other patients"
        }
        icon={SearchIcon}
      />

      <Benefit
        caption={"Simple way to make an appointment"}
        text={
          "Choose appropriate data and time, write your details and that's all"
        }
        icon={EventAvailableIcon}
      />

      <Benefit
        caption={"Come to the doctor's appointment"}
        text={"We will remind you about the selected date automatically"}
        icon={AccessTimeIcon}
      />

      <Benefit
        caption={"Our services are free of charge"}
        text={"Use of our website it is completely free for patients"}
        icon={ThumbUpIcon}
      />
    </Grid>
  );
};
