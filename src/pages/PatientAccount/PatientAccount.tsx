import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { getPatient } from "../../api/patients";
import { LogOutBanner } from "../../components/LogOutBanner/LogOutBanner";
import { Context } from "../../Context/Context";
import style from "./PatientAccount.module.scss";

export const PatientAccount = () => {

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { userID } = useContext(Context);
  const { data } = useQuery("patient", () => getPatient(userID));
  console.log(userID, data);



  return (
    <Box className={style.containerTop}>
      <LogOutBanner />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Appointments" {...a11yProps(0)} />
          <Tab label="Questions" {...a11yProps(1)} />
          <Tab label="Settings" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0} >
          <Box sx={{ color: "red" }}>You dont have any appointments yet</Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box sx={{ color: "red" }}>{data?.email}</Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box sx={{ color: "red" }}> {data?.name}</Box>
        </TabPanel>
      </Box >
    </Box >
  );
};
