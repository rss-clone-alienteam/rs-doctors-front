import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dayjs } from "dayjs";
import { BasicDatePicker, BasicTimePicker } from "./components/DatePicker";
import { SelectChangeEvent, Box, Typography, Grid, Button, Chip } from "@mui/material";
import { SelectInput } from "../../components/SectionFindDoctors/SelectInput/SelectInput";
import { ITimes, addSchedule, IAppointments } from "../../api/schedule";
import { useMutation, useQueryClient } from "react-query";


export const EditDataModal = ({ data }: {data: IAppointments} ) => {
  console.log(data);
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [date, setData] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const periodOptions = ["10", "15", "20", "30", "60"];
  const [period, setPeriod] = useState(periodOptions[2]);
  const [times, setTimes] = useState<ITimes>({});
  const [appointments, setAppointments] = useState(data ? {...data} : {});
  console.log(appointments);

  const mutation = useMutation(
    () => addSchedule(appointments, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["schedule", id]);
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
    setTimes(Object.fromEntries(Object.entries(times).filter((time) => time[0] !== item)));
  };

  const saveTime = () => {
    if(date) {
      const appointmentsTmp = {[date.format("DD-MM-YYYY")]: times};
      setAppointments((appointments) => ({...appointments, ...appointmentsTmp}));
    }
  };

  return (
    <Box sx={{display: "flex", flexDirection: "column"}}>
      <Box sx={{display: "flex"}}>
        <Box
          sx={{
            height: "320px",
            padding: "20px",
            backgroundColor: "rgba(0 0 0 /5%)",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
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
          }}>
          <Typography mb={2}>{date ? date.format("DD-MM-YYYY") : "Date has not chosen yet"}</Typography>
          <Grid container spacing={1} mb={2} sx={{width: "400px"}}>
            {
              Object.keys(times).map((item, index) =>
                <Grid item xs={3} key={index}>
                  <Chip
                    label={item}
                    variant="outlined"
                    onDelete={deleteItem(item)}
                  />
                </Grid>
              )
            }
          </Grid>
          {Object.keys(times).length ? <Button onClick={saveTime}>Ok</Button> : null}
        </Box>
      </Box>
      <Button onClick={() => mutation.mutate()}>Update</Button>
    </Box>
  );
};
