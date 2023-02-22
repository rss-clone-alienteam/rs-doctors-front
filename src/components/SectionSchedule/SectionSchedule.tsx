import { Box, Typography, Chip, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { IAppointments } from "../../api/schedule";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Appointment } from "../../api/patients";
import { Modal } from "../Modal/Modal";
import { useState } from "react";
import { MakeAppointmentModal } from "./MakeAppointmentModal";

export const SectionSchedule = ({ data, onClick, doctor }: { data: IAppointments; onClick: (day: string, time: string) => Promise<Appointment | undefined | void> | void; doctor: string }) => {

  const [isOpen, setOpen] = useState(false);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [doctorName, setDoctorName] = useState("");

  const openModal = (date: string, time: string) => {
    setOpen(true);
    setDay(date);
    setTime(time);
    setDoctorName(doctor);
  };
  const closeModal = () => setOpen(false);


  return (
    <Box>
      {Object.entries(data)
        .sort((a, b) => Number(a[0].substring(0, 2)) - Number(b[0].substring(0, 2)))
        .map(([date, timeObj]) => (
          <Accordion key={date}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontSize={"14px"} mb={1.5}>
                {date}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {Object.entries(timeObj)
                .sort(
                  (a, b) =>
                    Number(a[0]?.split(":")[0]) * 60 + Number(a[0]?.split(":")[1]) - (Number(b[0]?.split(":")[0]) * 60 + Number(b[0]?.split(":")[1])),
                )
                .map(([time, patientId]) =>
                  patientId !== null ? (
                    <Chip key={`${date}-${time}`} sx={{ cursor: "pointer" }} label={time} onClick={() => {
                      openModal(date, time);
                      // onClick(date, time);
                    }} />
                  ) : (
                    <Chip key={`${date}-${time}`} sx={{ cursor: "pointer", margin: "5px" }} label={time} variant="outlined" onClick={() => {
                      openModal(date, time);
                      // onClick(date, time);
                    }} />
                  ),
                )}
            </AccordionDetails>
          </Accordion>
        ))}
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MakeAppointmentModal actionFunc={onClick} date={day} time={time} doctor={doctorName} close={closeModal} />
      </Modal>
    </Box>
  );
};
