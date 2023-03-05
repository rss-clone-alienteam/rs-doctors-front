import style from "./InfoDoctor.module.scss";
import { Box } from "@mui/system";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import { AddressDoctor } from "../AddressDoctor/AddressDoctor";
import { ReviewsDoctor } from "../ReviewsDoctor/ReviewsDoctor";
import { ServicesDoctor } from "../ServicesDoctor/ServicesDoctor";
import { IDoctor } from "../../../api/doctors";
import { useParams } from "react-router-dom";
import { AboutDoctor } from "../AboutDoctor/AboutDoctor";

interface InfoDoctorProp {
  data: IDoctor;
  feedback?: string;
  changeSetFeedback?: (value: string) => void;
}

const InfoDoctor = ({ data, feedback, changeSetFeedback }: InfoDoctorProp) => {
  const { review } = useParams();

  const current = review ? review : "1";

  const [value, setValue] = useState(current);

  useEffect(() => {
    if (feedback === "3") setValue(feedback);
  }, [feedback]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (changeSetFeedback) changeSetFeedback(newValue);
  };

  return (
    <Box className={style.container}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={{ fontSize: { xs: "11px", sm: "14px", md: "16px" }, minWidth: 0 }} label="Address" value="1" />
            <Tab sx={{ fontSize: { xs: "11px", sm: "14px", md: "16px" }, minWidth: 0 }} label="Services" value="2" />
            <Tab sx={{ fontSize: { xs: "11px", sm: "14px", md: "16px" }, minWidth: 0 }} label="Reviews" value="3" />
            <Tab sx={{ fontSize: { xs: "11px", sm: "14px", md: "16px" }, minWidth: 0 }} label="About" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <AddressDoctor data={data} onShowAll={handleChange} />
        </TabPanel>
        <TabPanel value="2">
          <ServicesDoctor data={data} />
        </TabPanel>
        <TabPanel value="3">
          <ReviewsDoctor data={data} />
        </TabPanel>
        <TabPanel value="4">
          <AboutDoctor data={data} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export { InfoDoctor };
