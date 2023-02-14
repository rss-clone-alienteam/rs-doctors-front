import { useState } from "react";
import { Button, Snackbar, Alert, Box, Typography, Grid } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { IDoctor, getDoctor, updateDoctorImage } from "../../api/doctors";
import { Modal } from "../../components/Modal/Modal";
import { EditDoctorModal } from "./EditDoctorModal";
import { PhotoWithUpload } from "../../components/PhotoWithUpload/PhotoWithUpload";
import { DescriptionField } from "./components/DescriptionField";
import { AlertType } from "./types";
import MedicalInformation from "@mui/icons-material/MedicalInformation";
import LocationCity from "@mui/icons-material/LocationCity";
import style from "./DoctorAccount.module.scss";

export const DoctorAccount = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data: File) => updateDoctorImage(data, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["doctor", id]);
        setAlert({ severity: "success", message: "Image has been successfully updated" });
      },
    }
  );

  const { data, isLoading } =
    useQuery<IDoctor, Error>(["doctor", id], () => getDoctor(id), {onError: () => {
      setAlert({ severity: "error", message: "Error during fetching data" });
    }});

  const onUploadAvatar = async (file: File) => {
    mutation.mutate(file);
  };

  const [alert, setAlert] = useState<AlertType | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <Box className={style.wrapper}>
      <Box sx={{display: "flex", alignItems: "center"}} mb={3}>
        <PhotoWithUpload isLoading={isLoading} onUpload={onUploadAvatar} image={data?.photo} />
        <Typography variant="h3" color={"primary"}>
          {data?.nameDoctor} {data?.surname}
        </Typography>
      </Box>
      <Button onClick={handleModalOpen}>Edit</Button>
      <Box className={style.infoBlock} mb={4} mt={1}>
       <DescriptionField icon={MedicalInformation} caption={"Category:"} text={data?.category}/>
       <DescriptionField icon={LocationCity} caption={"City:"} text={data?.city}/>
      </Box>
      <Grid container gap={2}>
        <Grid className={style.infoBlock} item xs>
          <Typography>About me:</Typography>
        </Grid>
        <Grid className={style.infoBlock} item xs>
          <Button>Сhoice of appointment time</Button>
        </Grid>
      </Grid>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditDoctorModal data={data} id={id} onClose={handleModalClose} setAlert={setAlert} />
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
  );
};
