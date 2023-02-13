import { Box } from "@mui/system";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { AddressDoctor } from "./AddressDoctor";
import { ReviewsDoctor } from "./ReviewsDoctor";
import { ServicesDoctor } from "./ServicesDoctor";
import { IDoctor } from "../PageDoctors/CardDoctor";

interface InfoDoctorProp {
  data: IDoctor;
}

const InfoDoctor = ({ data }: InfoDoctorProp) => {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Address" value="1" />
            <Tab label="Services" value="2" />
            <Tab label="Reviews" value="3" />
            <Tab label="About" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <AddressDoctor data={data} />
        </TabPanel>
        <TabPanel value="2">
          <ServicesDoctor />
        </TabPanel>
        <TabPanel value="3">
          <ReviewsDoctor />
        </TabPanel>
        <TabPanel value="4">Item 4</TabPanel>
      </TabContext>
    </Box>
  );
};

export { InfoDoctor };
