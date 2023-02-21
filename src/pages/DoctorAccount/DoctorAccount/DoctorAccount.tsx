import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { IDoctor, getDoctor, updateDoctorImage } from "../../../api/doctors";
import { ISchedule, getSchedule } from "../../../api/schedule";
import { Modal } from "../../../components/Modal/Modal";
import { EditDataModal } from "./EditDateModal";
import { PhotoWithUpload } from "../../../components/PhotoWithUpload/PhotoWithUpload";
import { DescriptionField } from "./components/DescriptionField";
import { SectionSchedule } from "../../../components/SectionSchedule/SectionSchedule";
import { AlertType } from "../types";
import { Button, Snackbar, Alert, Box, Typography, Grid } from "@mui/material";
import MedicalInformation from "@mui/icons-material/MedicalInformation";
import LocationCity from "@mui/icons-material/LocationCity";
import CircularProgress from "@mui/material/CircularProgress";
import style from "./DoctorAccount.module.scss";
import { LogOutBanner } from "../../../components/LogOutBanner/LogOutBanner";

const openModal = () => {
  console.log("");
};

export const DoctorAccount = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(
    (data: File) => updateDoctorImage(data, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["doctor", id]);
        setAlert({ severity: "success", message: "Image has been successfully updated" });
      },
    }
  );

  const { data: doctor, isLoading: isLoadingDoctor } =
    useQuery<IDoctor, Error>(["doctor", id], () => getDoctor(id), {
      onError: () => {
        setAlert({ severity: "error", message: "Error during fetching data" });
      }
    });

  const onUploadAvatar = async (file: File) => {
    mutation.mutate(file);
  };

  const { data: infoAppointments, isLoading: isLoadingSchedule, isSuccess: isSuccessSchedule } =
    useQuery<ISchedule, Error>(["schedule", id], () => getSchedule(id), {
      onError: () => {
        setAlert({ severity: "error", message: "Error during fetching data" });
      }
    });

  const [alert, setAlert] = useState<AlertType | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const handleModalOpen = (event: React.MouseEvent) => {
    setTypeModal(`${event.currentTarget.id}`);
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);


  return (
    <>
      <LogOutBanner />
      <Box className={style.wrapper}>
        <Box sx={{ display: "flex", alignItems: "center" }} mb={3}>
          <PhotoWithUpload isLoading={isLoadingDoctor} onUpload={onUploadAvatar} image={doctor?.photo} />
          <Typography variant="h3" color={"primary"}>
            {doctor?.nameDoctor} {doctor?.surname}
          </Typography>
        </Box>
        <Button onClick={() => navigate("edit")}>Edit</Button>
        <Box className={style.infoBlock} mb={4} mt={1}>
          <DescriptionField icon={MedicalInformation} caption={"Category:"} text={doctor?.category} />
          <DescriptionField icon={LocationCity} caption={"City:"} text={doctor?.city} />
        </Box>
        <Grid container gap={2}>
          <Grid className={style.infoBlock} item xs>
            <Typography>About me:</Typography>
          </Grid>
          <Grid className={style.infoBlock} item xs>
            <Button id={"time"} onClick={handleModalOpen}>Сhoice of appointment time</Button>
            {isLoadingSchedule ? (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box sx={{height: "300px", overflowY: "scroll"}}>
                {isSuccessSchedule && infoAppointments ? (
                  <SectionSchedule data={infoAppointments.schedule} onClick={openModal} />
                ) : (<Typography mb={2}>{"No saved appointment time"}</Typography>)
                }
              </Box>
            )}
          </Grid>
        </Grid>
        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {
            typeModal === "time" && isSuccessSchedule
            ? <EditDataModal data={infoAppointments.schedule} />
            : <></>
          }
        </Modal>
        <Snackbar
          open={!!alert}
          autoHideDuration={3000}
          onClose={() => setAlert(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={() => setAlert(null)} severity={alert?.severity || "success"}>{alert?.message}</Alert>
        </Snackbar>
      </Box>
    </>
  );
};
