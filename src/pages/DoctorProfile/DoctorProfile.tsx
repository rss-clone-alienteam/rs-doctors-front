import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { HeaderDoctor } from "../../components/ProfileDoctor/HeaderDoctor";
import { InfoDoctor } from "../../components/ProfileDoctor/InfoDoctor";
import { getDoctor } from "../../api/doctors";
import { useQuery } from "react-query";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const url = window.location.href;
  const id = url.slice(url.lastIndexOf("/") + 1);

  const { isLoading, data } = useQuery("doctor", () => getDoctor(id));

  console.log(data);

  return (
    <>
      {data && (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <HeaderDoctor data={data} />
          <InfoDoctor data={data} />
          <Button variant="contained" onClick={() => navigate(`/review/${data.id}`)}>
            Add Review
          </Button>
        </Box>
      )}
      {isLoading && <CircularProgress size={120} sx={{ position: "fixed", top: "45vh", left: "45vw" }} />}
    </>
  );
};

export { DoctorProfile };
