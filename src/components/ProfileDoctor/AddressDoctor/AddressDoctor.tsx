import style from "./AddressDoctor.module.scss";
import { Box, Grid, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SecurityIcon from "@mui/icons-material/Security";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PaymentsIcon from "@mui/icons-material/Payments";
import LanguageIcon from "@mui/icons-material/Language";
import Button from "@mui/material/Button";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { IDoctor } from "../../../api/doctors";
import { useQuery } from "react-query";
import { getMap } from "../../../api/doctors";

interface AddressDoctorProp {
  data: IDoctor;
  onShowAll: (event: React.SyntheticEvent, newValue: string) => void;
}

const AddressDoctor = ({ data, onShowAll }: AddressDoctorProp) => {
  const [number, setNumber] = useState(false);

  const { data: coords } = useQuery(`coords-${data.id}`, () => {
    if (!data.address) return;
    return getMap(data.address);
  });

  return (
    <Box className={style.container}>
      <Grid container direction="column">
        <Grid item mb={3} xs={12} className={style.containerTitle}>
          <Typography variant="body1" sx={{ fontSize: { xs: "16px", sm: "22px" } }} color={"rgb(0 0 0)"}>
            Address
          </Typography>
        </Grid>
        <Grid item container direction="column" spacing={2}>
          <Grid item container direction="row">
            <Grid item className={style.infoMapIconContainer} mr={1}>
              <LocationOnIcon />
            </Grid>
            <Grid item xs display={"flex"} alignItems={"center"}>
              <Typography variant="body2" sx={{ fontSize: { xs: "14px", sm: "16px" } }} mr={1}>
                {data.address}
              </Typography>
              {coords && (
                <Link href={`https://yandex.ru/maps/?whatshere[point]=${coords[1]},${coords[0]}&whatshere[zoom]=17`} underline="hover">
                  Map
                </Link>
              )}
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row">
              <Grid item className={style.infoMapIconContainer} mr={1}>
                <SecurityIcon />
              </Grid>
              <Grid item container spacing={1} direction="column" xs>
                <Grid item>
                  <Typography variant="body2" sx={{ fontSize: { xs: "14px", sm: "16px" } }} mr={1}>
                    Insurance accepted at this address
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" sx={{ fontSize: { xs: "14px", sm: "16px" } }} mr={1}>
                    Private patients (without insurance)
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container direction="row">
              <Grid item className={style.infoMapIconContainer} mr={1}>
                <PaymentsIcon />
              </Grid>
              <Grid item xs>
                <Typography variant="body2" sx={{ fontSize: { xs: "14px", sm: "16px" } }} mr={1}>
                  {data.paymentMethod}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container direction="row">
              <Grid item className={style.infoMapIconContainer} mr={1}>
                <LanguageIcon />
              </Grid>
              <Grid item xs>
                <Typography variant="body2" sx={{ fontSize: { xs: "14px", sm: "16px" } }} mr={1}>
                  {data.languages}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container>
            <Grid item className={style.infoMapIconContainer} mr={1}>
              <LocalPhoneIcon />
            </Grid>
            <Grid item container xs>
              <Grid item>
                {number ? <Link href={`tel:${data.phone}`}>{data.phone}</Link> : <Box component={"span"}>{`${data?.phone?.slice(0, -5)}...`}</Box>}
              </Grid>
              <Grid item>
                <Button sx={{ height: "10px" }} variant="text" onClick={() => setNumber((prev) => !prev)}>
                  {number ? "Hide" : "Show"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item className={style.infoMapIconContainer} mr={1}>
              <MedicalServicesIcon />
            </Grid>
            <Grid item container spacing={1} direction="column" xs>
              {data.services.slice(0, 2).map((service, index) => (
                <Grid item key={`${data.id}${index}`}>
                  {`${service.name} • ${service.price}`}
                </Grid>
              ))}
              <Grid item>
                <Button sx={{ height: "10px" }} variant="text" onClick={(event) => onShowAll(event, "2")}>
                  {"Show all"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export { AddressDoctor };
