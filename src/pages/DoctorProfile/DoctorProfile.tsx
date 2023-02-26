import { Box, CircularProgress, Grid } from "@mui/material";
import { HeaderDoctor } from "../../components/ProfileDoctor/HeaderDoctor/HeaderDoctor";
import { InfoDoctor } from "../../components/ProfileDoctor/InfoDoctor/InfoDoctor";
import { getDoctor } from "../../api/doctors";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getSchedule } from "../../api/schedule";
import { SectionSchedule } from "../../components/SectionSchedule/SectionSchedule";
import { useEffect, useState } from "react";

const DoctorProfile = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState("");

  const changeSetFeedback = (value: string) => {
    setFeedback(value);
  };

  const { isLoading, data, isFetching } = useQuery("doctor", () => getDoctor(id));

  const { data: doctor, refetch: refetchDoc } = useQuery("schedule", () => getSchedule(data?.id), {
    enabled: !!data?.id,
  });

  useEffect(() => {
    refetchDoc();
  }, [data, refetchDoc]);

  if (isLoading || isFetching) return <CircularProgress size={120} sx={{ position: "fixed", top: "45vh", left: "45vw" }} />;

  return (
    <>
      <Box width={"100%"} display="flex" justifyContent={"center"}>
        <Grid width={"100%"} container direction={{ xs: "row", sm: "row", md: "row" }} spacing={2} alignItems={{ sm: "flex-start", xs: "center" }}>
          <Grid item xs={12} sm={8.5} md={7} lg={6}>
            {data && (
              <>
                <HeaderDoctor data={data} changeSetFeedback={changeSetFeedback} />
                <InfoDoctor data={data} feedback={feedback} changeSetFeedback={changeSetFeedback} />
              </>
            )}
          </Grid>

          <Grid item xs={12} sm md lg>
            {isFetching ? (
              <CircularProgress size={80} sx={{ position: "fixed", top: "45vh", left: "75vw" }} />
            ) : (
              doctor && <SectionSchedule data={doctor.schedule} onClick={() => console.log("12300")} />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export { DoctorProfile };
