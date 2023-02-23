import { Box, CircularProgress, Grid } from "@mui/material";
import { HeaderDoctor } from "../../components/ProfileDoctor/HeaderDoctor/HeaderDoctor";
import { InfoDoctor } from "../../components/ProfileDoctor/InfoDoctor/InfoDoctor";
import { getDoctor } from "../../api/doctors";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getSchedule } from "../../api/schedule";
import { SectionSchedule } from "../../components/SectionSchedule/SectionSchedule";

const DoctorProfile = () => {
  const { id } = useParams();

  const { isLoading, data } = useQuery("doctor", () => getDoctor(id));
  const dataId = data?.id;
  const { data: doctor } = useQuery("schedule", () => getSchedule(dataId), {
    enabled: !!dataId,
  });

  return (
    <>
      {data && (
        <>
          <Box width={"100%"} marginTop={"20px"}>
            <Grid container direction="row" justifyContent="center" alignItems="flex-start">
              <Grid item xs={7}>
                <HeaderDoctor data={data} />
                <InfoDoctor data={data} />
              </Grid>
              <Grid item xs ml={3}>
                {doctor && <SectionSchedule data={doctor.schedule} onClick={() => console.log("12300")} />}
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      {isLoading && <CircularProgress size={120} sx={{ position: "fixed", top: "45vh", left: "45vw" }} />}
    </>
  );
};

export { DoctorProfile };
