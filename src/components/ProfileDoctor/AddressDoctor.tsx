import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SecurityIcon from "@mui/icons-material/Security";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Button from "@mui/material/Button";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { ServicesDoctor } from "./ServicesDoctor";
import { IDoctor } from "../../api/doctors";

interface AddressDoctorProp {
  data: IDoctor;
}

const AddressDoctor = ({ data }: AddressDoctorProp) => {
  const [number, setNumber] = useState(false);

  return (
    <Box color={"black"}>
      <Box component={"div"}>Address</Box>

      <Grid container direction="column">
        <Grid item>
          <Grid container direction="row">
            <Grid item width={"20px"} mr={"5px"}>
              <LocationOnIcon />
            </Grid>
            <Grid item>
              <Box component={"span"}>{data.address}</Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="row">
            <Grid item width={"20px"} mr={"5px"}>
              <SecurityIcon />
            </Grid>
            <Grid item display={"flex"} flexDirection={"column"}>
              {/* Do it with Map */}
              {/* Do it with Map */}
              {/* Do it with Map */}
              {/* Do it with Map */}
              <Box component={"span"}>Insurance accepted at this address</Box>
              <Box component={"span"}>Private patients (without insurance)</Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="row">
            <Grid item width={"20px"} mr={"5px"}>
              <LocalPhoneIcon />
            </Grid>
            <Grid item display={"flex"}>
              <Box component={"span"}>{number ? data.phone : `${data.phone.slice(0, -5)}...`}</Box>
              <Button variant="text" onClick={() => setNumber((prev) => !prev)}>
                {number ? "Hide" : "Show"}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="row">
            <Grid item width={"20px"} mr={"5px"}>
              <MedicalServicesIcon />
            </Grid>
            <Grid item display={"flex"} flexDirection={"column"}>
              {/* Do it with Map */}
              {/* Do it with Map */}
              {/* Do it with Map */}
              {/* Do it with Map */}
              <ServicesDoctor />
              {/* <Box component={"span"}>Gynecological consultation</Box>
              <Box component={"span"}>Gynecological consultation • from PLN 230</Box>
              <Box component={"span"}>Pregnancy ultrasound • from PLN 310</Box> */}
            </Grid>
          </Grid>
        </Grid>

        <Grid item></Grid>
      </Grid>
    </Box>
  );
};

export { AddressDoctor };
