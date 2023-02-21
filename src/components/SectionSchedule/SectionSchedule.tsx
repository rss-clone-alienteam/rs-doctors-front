import { Box, Typography, Chip, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { IAppointments } from "../../api/schedule";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const SectionSchedule = ({ data, onClick }: { data: IAppointments; onClick: () => void }) => {
  console.log(13, data);
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
                    <Chip key={`${date}-${time}`} sx={{ cursor: "pointer" }} label={time} onClick={onClick} />
                  ) : (
                    <Chip key={`${date}-${time}`} sx={{ cursor: "pointer", margin: "5px" }} label={time} variant="outlined" onClick={onClick} />
                  ),
                )}
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
};
