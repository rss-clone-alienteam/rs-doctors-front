import { Box, CircularProgress, Grid } from "@mui/material";
import { HeaderDoctor } from "../../components/ProfileDoctor/HeaderDoctor/HeaderDoctor";
import { InfoDoctor } from "../../components/ProfileDoctor/InfoDoctor/InfoDoctor";
import { getDoctor } from "../../api/doctors";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getSchedule } from "../../api/schedule";
import { SectionSchedule } from "../../components/SectionSchedule/SectionSchedule";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";
import { showToastMessage } from "../../utils/showToastMessage";
import { Modal } from "../../components/Modal/Modal";
import { MakeAppointmentModal } from "../../components/SectionSchedule/MakeAppointmentModal";
import style from "../../components/PageDoctors/CardDoctor.module.scss";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const { setAppointment, isUserLogIn, profile } = useContext(Context);

  const { id } = useParams();
  const [feedback, setFeedback] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeSetFeedback = (value: string) => {
    setFeedback(value);
  };

  const { isLoading, data: doctor, isFetching } = useQuery("doctor", () => getDoctor(id));

  const { data: doctorSchedule, refetch: refetchDoc } = useQuery("schedule", () => getSchedule(doctor?.id), {
    enabled: !!doctor?.id,
  });

  useEffect(() => {
    refetchDoc();
  }, [doctor, doctorSchedule, refetchDoc]);

  if (isLoading || isFetching) return <CircularProgress size={120} sx={{ position: "fixed", top: "45vh", left: "45vw" }} />;

  const clickHandler = (date: string, time: string) => {
    if (!isUserLogIn) {
      showToastMessage("Please sign in", "error");
      navigate("/auth/sign-in");
      return;
    }
    if (profile === "doctor") {
      showToastMessage("Please register as a patient", "error");
      return;
    }
    if (doctorSchedule?.schedule[date][time] === null && doctor !== undefined) {
      setAppointment({
        doctor,
        date,
        time,
      });
      setIsModalOpen(true);
    } else {
      showToastMessage("Sorry, this time is already taken", "error");
    }
  };

  return (
    <>
      <Box width={"100%"} display="flex" justifyContent={"center"} className={style.scroll}>
        <Grid width={"100%"} container direction={{ xs: "row", sm: "row", md: "row" }} spacing={2} alignItems={{ sm: "flex-start", xs: "center" }}>
          <Grid item xs={12} sm={8.5} md={7} lg={6}>
            {doctor && (
              <>
                <HeaderDoctor data={doctor} changeSetFeedback={changeSetFeedback} />
                <InfoDoctor data={doctor} feedback={feedback} changeSetFeedback={changeSetFeedback} />
              </>
            )}
          </Grid>

          <Grid item xs={12} sm md lg maxHeight="60vh" overflow="scroll" p={2}>
            {isFetching ? (
              <CircularProgress size={80} sx={{ position: "fixed", top: "45vh", left: "75vw" }} />
            ) : (
              doctorSchedule && (
                <SectionSchedule data={doctorSchedule.schedule} onClick={() => setIsModalOpen(true)} onClickAppointment={clickHandler} />
              )
            )}
          </Grid>
        </Grid>
      </Box>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <MakeAppointmentModal update={refetchDoc} close={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export { DoctorProfile };
