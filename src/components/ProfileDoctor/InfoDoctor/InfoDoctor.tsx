import style from "./InfoDoctor.module.scss";
import { Box } from "@mui/system";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { AddressDoctor } from "../AddressDoctor/AddressDoctor";
import { ReviewsDoctor } from "../ReviewsDoctor/ReviewsDoctor";
import { ServicesDoctor } from "../ServicesDoctor/ServicesDoctor";
import { IDoctor } from "../../../api/doctors";
import { useNavigate, useParams } from "react-router-dom";

interface InfoDoctorProp {
  data: IDoctor;
}

const InfoDoctor = ({ data }: InfoDoctorProp) => {
  const { review } = useParams();
  const navigate = useNavigate();
  console.log(review);

  const current = review ? review : "1";

  const [value, setValue] = useState(current);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(`/doctor/${data.id}`);
  };

  return (
    <Box className={style.container}>
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
          <AddressDoctor data={data} onShowAll={handleChange} />
        </TabPanel>
        <TabPanel value="2">
          <ServicesDoctor data={data} />
        </TabPanel>
        <TabPanel value="3">
          <ReviewsDoctor data={data} />
        </TabPanel>
        <TabPanel value="4">Item 4</TabPanel>
      </TabContext>
    </Box>
  );
};

export { InfoDoctor };
