import { Box, Tab, Tabs, Typography, Button } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/Context";
import { AuthService } from "../../services/AuthService";
import style from "./PatientAccount.module.scss";

export const PatientAccount = () => {
  const { userEmail } = useContext(Context);

  const { setIsUserLogIn } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    AuthService.signOut();
    setIsUserLogIn(false);
    navigate("/");
  };

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

  return (
    <Box className={style.containerTop}>
      <Box className={style.caption}>
        <Typography className={style.text}>
          You logged in as {userEmail}
        </Typography>
        <Button color="error" variant="contained" onClick={() => logOut()}>
          Log Out
        </Button>
      </Box>
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
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </Box>
  );
};
