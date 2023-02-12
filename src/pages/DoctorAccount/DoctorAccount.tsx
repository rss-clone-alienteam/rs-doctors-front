import { useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { IDoctor, getDoctor } from "../../api/doctors";
import { Modal } from "../../components/Modal/Modal";
import { EditDoctorModal } from "./EditDoctorModal";

export const DoctorAccount = () => {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const { data } =
    useQuery<IDoctor, Error>("doctor", () => getDoctor(id), {onError: () => {
      setError(true);
    }});
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditDoctorModal data={data} id={id} />
      </Modal>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setError(false)} severity="error">Error during fetching data</Alert>
      </Snackbar>
    </>
  );
};
