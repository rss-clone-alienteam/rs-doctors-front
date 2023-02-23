import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dayjs } from "dayjs";
import { BasicDatePicker, BasicTimePicker } from "./DatePicker";
import { AlertType } from "../types";
import { SelectChangeEvent, Box, Typography, Grid, Button, Chip, Alert, Snackbar } from "@mui/material";
import { SelectInput } from "../../../components/SectionFindDoctors/SelectInput/SelectInput";
import { ITimes, addSchedule, IAppointments } from "../../../api/schedule";
import { useMutation, useQueryClient } from "react-query";


export const EditDataModal = ({ data }: {data: IAppointments} ) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [date, setData] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const periodOptions = ["10", "15", "20", "30", "60"];
  const [period, setPeriod] = useState(periodOptions[2]);
  const [times, setTimes] = useState<ITimes>({});
  const [alert, setAlert] = useState<AlertType | null>(null);

  const mutation = useMutation(
    (appointments: IAppointments) => addSchedule(appointments, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["schedule", id]);
        setAlert({ severity: "success", message: "The schedule for the selected date has been successfully added" });
      }
    }
  );

  useEffect(() => {
    setTimes({});
    if (startTime && endTime) {
      const minStart = Number(startTime?.format("HH:mm").split(":")[0]) * 60
        + Number(startTime?.format("HH:mm").split(":")[1]);
      const minEnd = Number(endTime?.format("HH:mm").split(":")[0]) * 60
        + Number(endTime?.format("HH:mm").split(":")[1]);
      let start = minStart;
      while (start < minEnd) {
        const time = `${Math.trunc(start / 60)}`.padStart(2, "0")
          + ":"
          + `${Math.round(((start / 60) - Math.trunc(start / 60)) * 60)}`.padStart(2, "0");
        const timeTmp = {[`${time}`] : ""};
        setTimes((times) => ({
          ...times,
          ...timeTmp
        }));
        start += Number(period);
      }
    }
  }, [startTime, endTime, period]);

  const deleteItem = (item: string) => () => {
    Object.keys(times).length ?
      setTimes(Object.fromEntries(Object.entries(times).filter((time) => time[0] !== item)))
    : date ?
      setTimes(Object.fromEntries(Object.entries(data[date.format("DD-MM-YYYY")])
        .sort((time1, time2) =>
          Number(time1[0]?.split(":")[0]) * 60 + Number(time1[0]?.split(":")[1])
          - (Number(time2[0]?.split(":")[0]) * 60 + Number(time2[0]?.split(":")[1]))
        )
        .filter((time) => time[0] !== item)))
      : false;
  };

  const saveSchedule = () => {
    const appointments = date ? {[date.format("DD-MM-YYYY")]: times} : {};
    const schedule = data ? {...data, ...appointments} : {};
    mutation.mutate(schedule);
  };

  return (
    <Box sx={{display: "flex", flexDirection: "column"}}>
      <Alert severity="info" sx={{fontSize: "18px", marginBottom: "50px"}}>
        {"Select the date, time of work and duration of one appointment"}
      </Alert>
      <Box sx={{display: "flex", alignItems: "center"}} mb={5}>
        <Box
          sx={{
            marginRight: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <BasicDatePicker
            label={"Select date of work"}
            value={date}
            onChange={(newValue) => setData(newValue)}
          />
          <BasicTimePicker
            label={"Select start of work"}
            value={startTime}
            onChange={(newValue) => setStartTime(newValue)}
          />
          <BasicTimePicker
            label={"Select end of work"}
            value={endTime}
            onChange={(newValue) => setEndTime(newValue)}
            />
          <SelectInput
            placeholder="Time for one appointment"
            options={periodOptions}
            value={period}
            onChange={(event: SelectChangeEvent) => setPeriod(event.target.value)}
          />
        </Box>
        <Box
          pl={3}
          sx={{
            color:"black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
          >
            {
              date ?
                <>
                  <Typography mb={1.5}>{date.format("DD-MM-YYYY")}</Typography>
                  {
                    Object.prototype.hasOwnProperty.call(data, date.format("DD-MM-YYYY"))
                    && !Object.keys(times).length
                    ?
                      <>
                        <Alert severity="error" sx={{marginBottom: "20px"}}>
                          {"You already have a schedule for the selected date, check appointments"}
                        </Alert>
                        <Grid container spacing={1} mb={2} sx={{width: "400px"}}>
                          {Object.keys(data[date.format("DD-MM-YYYY")])
                          .sort((time1, time2) =>
                            Number(time1?.split(":")[0]) * 60 + Number(time1?.split(":")[1])
                            - (Number(time2?.split(":")[0]) * 60 + Number(time2?.split(":")[1]))
                          )
                          .map((item, index) =>
                            <Grid item xs={3} key={index}>
                              <Chip
                                label={item}
                                variant="outlined"
                                onDelete={deleteItem(item)}
                              />
                            </Grid>
                          )}
                        </Grid>
                      </>
                    :
                      <Grid container spacing={1} mb={2} sx={{width: "400px"}}>
                        {Object.keys(times).map((item, index) =>
                          <Grid item xs={3} key={index}>
                            <Chip
                              label={item}
                              variant="outlined"
                              onDelete={deleteItem(item)}
                            />
                          </Grid>
                        )}
                      </Grid>
                  }
                </>
              : <Alert severity="info" sx={{fontSize: "18px"}}>{"No selected dates yet"}</Alert>
            }
          {Object.keys(times).length ? <Button sx={{fontSize: "18px"}} onClick={saveSchedule}>Update</Button> : null}
        </Box>
      </Box>
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
