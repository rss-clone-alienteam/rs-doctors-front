import Box from "@mui/joy/Box";
import { Benefit } from "./Benefit/Benefit";
import style from "./SectionBenefits.module.scss";

export const SectionBenefits = () => {
  return (
    <Box className={style.container}>
      <Benefit
        caption={"Search Specialists"}
        text={
          "Choose among above 1000 specialists. Find out the opinions of other patients"
        }
        iconClassName={"fa-solid fa-magnifying-glass"}
      />

      <Benefit
        caption={"Simple way to make an appointment"}
        text={
          "Choose appropriate data and time, write your details and that's all"
        }
        iconClassName={"fa-regular fa-calendar-check"}
      />

      <Benefit
        caption={"Come to the doctor's appointment"}
        text={"We will remind you about the selected date automatically"}
        iconClassName={"fa-regular fa-clock"}
      />

      <Benefit
        caption={"Our services are free of charge"}
        text={"Use of our website it is completely free for patients"}
        iconClassName={"fa-regular fa-lightbulb"}
      />
    </Box>
  );
};
