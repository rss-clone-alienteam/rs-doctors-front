import { Box, Typography, Chip, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { IAppointments } from "../../api/schedule";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface IProps {
  data: IAppointments;
  onClick: (event: React.MouseEvent) => void;
  onClickAppointment?: (date: string, time: string) => void;
}

export const SectionSchedule = ({ data, onClick, onClickAppointment }: IProps) => {

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
            <AccordionDetails sx={{display: "flex", flexWrap: "wrap", gap: "5px"}}>
              {Object.entries(timeObj)
                .sort(
                  (a, b) =>
                    Number(a[0]?.split(":")[0]) * 60 + Number(a[0]?.split(":")[1]) - (Number(b[0]?.split(":")[0]) * 60 + Number(b[0]?.split(":")[1])),
                )
                .map(([time, patientId]) =>
                  patientId !== null ? (
                    <Chip key={`${date}-${time}`} id={`${date}-${time}`} sx={{ cursor: "pointer", border: "1px solid #00afbd"}} label={time} onClick={onClickAppointment ? () => onClickAppointment(date, time) : onClick} />
                  ) : (
                    <Chip key={`${date}-${time}`} id={`${date}-${time}`} sx={{ cursor: "pointer"}} label={time} variant="outlined" onClick={onClickAppointment ? () => onClickAppointment(date, time) : onClick} />
                  ),
                )}
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
};
