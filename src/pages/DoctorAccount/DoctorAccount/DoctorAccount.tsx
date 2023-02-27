import { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { IDoctor, getDoctor, updateDoctorImage, deleteDoctor } from "../../../api/doctors";
import { ISchedule, getSchedule } from "../../../api/schedule";
import { Modal } from "../../../components/Modal/Modal";
import { EditDataModal } from "./EditDateModal";
import { AppointmentModal } from "./AppointmentModal";
import { PhotoWithUpload } from "../../../components/PhotoWithUpload/PhotoWithUpload";
import { DescriptionField } from "./components/DescriptionField";
import { SectionSchedule } from "../../../components/SectionSchedule/SectionSchedule";
import { LogOutBanner } from "../../../components/LogOutBanner/LogOutBanner";
import { InfoDoctor } from "../../../components/ProfileDoctor/InfoDoctor/InfoDoctor";
import { showToastMessage } from "../../../utils/showToastMessage";
import {
  Button,
  Box,
  Typography,
  Grid,
  Modal as MuiModal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import MedicalInformation from "@mui/icons-material/MedicalInformation";
import LocationCity from "@mui/icons-material/LocationCity";
import style from "./DoctorAccount.module.scss";
import { Context } from "../../../Context/Context";

export const DoctorAccount = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setIsUserLogIn, setProfile } = useContext(Context);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const mutation = useMutation(
    (data: File) => updateDoctorImage(data, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["doctor", id]);
        showToastMessage("Image has been successfully updated", "success");
      },
    }
  );

  const mutationDeleteAccount = useMutation(
    async () => {
      await deleteDoctor(id);
    },
    {
      onSuccess: () => {
        setIsUserLogIn(false);
        setProfile("");
        navigate("/");
      },
      onError: () => {
        showToastMessage("Something goes wrong, please try again", "error");
      }
    }
  );

  const { data: doctor, isLoading: isLoadingDoctor, isSuccess: isSuccessDoctor } =
    useQuery<IDoctor, Error>(["doctor", id], () => getDoctor(id), {
      onError: () => {
        showToastMessage("Error during fetching data", "error");
      }
    });

  const onUploadAvatar = async (file: File) => {
    mutation.mutate(file);
  };

  const { data: infoAppointments, isLoading: isLoadingSchedule, isSuccess: isSuccessSchedule } =
    useQuery<ISchedule, Error>(["schedule", id], () => getSchedule(id), {
      onError: () => {
        showToastMessage("Error during fetching data", "error");
      }
    });

  const [isModalOpen, setModalOpen] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [time, setTime] = useState("");

  const handleModalOpen = (event: React.MouseEvent) => {
    setTypeModal(`${event.currentTarget.id}`);
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);

  const openModal = (event: React.MouseEvent) => {
    setTime(event.currentTarget.id);
    setTypeModal("appointment");
    setModalOpen(true);
  };

  const deleteAccount = () => {
    mutationDeleteAccount.mutate();
  };

  return (
    <>
      {
        isLoadingDoctor && (
          <CircularProgress size={120} sx={{ position: "fixed", top: "45vh", left: "45vw" }} />
        )
      }
      {isSuccessDoctor && (
        <>
          <LogOutBanner />
          <Box className={style.wrapper}>
            <Box className={style.photoBlock}>
              <PhotoWithUpload isLoading={isLoadingDoctor} onUpload={onUploadAvatar} image={doctor.photo} />
              <Typography color={"primary"} sx={{fontSize: {xs: "30px", sm: "50px"}}}>
                {doctor.nameDoctor} {doctor.surname}
              </Typography>
            </Box>
            <Box className={style.infoBlock} mb={2} mt={1}>
              <DescriptionField icon={MedicalInformation} caption={"Category:"} text={doctor.category} />
              <DescriptionField icon={LocationCity} caption={"City:"} text={doctor.city} />
            </Box>
            <Button onClick={openDialog} sx={{fontSize: "16px", marginRight: 3, color: "red"}}>Delete account</Button>
            <Button onClick={() => navigate("edit")} sx={{fontSize: "16px"}}>Edit Info</Button>
            <Grid className={style.containerInfo} container gap={2}>
              <Grid className={style.infoBlock} item xs>
                <InfoDoctor data={doctor}></InfoDoctor>
              </Grid>
              <Grid className={style.infoBlock} item xs>
                <Button id={"time"} onClick={handleModalOpen} sx={{marginBottom: "10px"}}>Сhoice of appointment time</Button>
                {isLoadingSchedule ? (
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Box sx={{ height: "300px", overflowY: "scroll" }}>
                    {isSuccessSchedule && infoAppointments ? (
                      <SectionSchedule data={infoAppointments.schedule} onClick={openModal} />
                    ) : (<Typography mb={2}>{"No saved appointment time"}</Typography>)
                    }
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      {
        typeModal === "time" && isSuccessSchedule
          ? <Modal
              open={isModalOpen}
              onClose={handleModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <EditDataModal data={infoAppointments.schedule} />
            </Modal>
          : typeModal === "appointment" && isSuccessSchedule
              ? <MuiModal
                  open={isModalOpen}
                  onClose={handleModalClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className={style.infoPatientWrapper}>
                    <AppointmentModal data={infoAppointments.schedule} dateTime={time}/>
                  </Box>
                </MuiModal>
              : <></>
      }
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure that you want to delete account
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"It's unchangeable operation"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Disagree</Button>
          <Button onClick={deleteAccount} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
