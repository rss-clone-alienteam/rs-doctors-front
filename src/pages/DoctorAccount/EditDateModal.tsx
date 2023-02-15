import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dayjs } from "dayjs";
import { BasicDatePicker, BasicTimePicker } from "./components/DatePicker";
import { SelectChangeEvent, Box, Typography, Grid, Button, Chip } from "@mui/material";
import { SelectInput } from "../../components/SectionFindDoctors/SelectInput/SelectInput";
import { ISchedule, addSchedule, getSchedule } from "../../api/schedule";

const schedule: ISchedule = {};

export const EditDataModal = () => {
  const { id } = useParams();
  const [data, setData] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const periodOptions = ["10", "15", "20", "30", "60"];
  const [period, setPeriod] = useState(periodOptions[2]);
  const [times, setTimes] = useState<string[] | []>([]);

  useEffect(() => {
    if (startTime && endTime) {
      const minStart = Number(startTime?.format("HH:mm").split(":")[0]) * 60
        + Number(startTime?.format("HH:mm").split(":")[1]);
      const minEnd = Number(endTime?.format("HH:mm").split(":")[0]) * 60
        + Number(endTime?.format("HH:mm").split(":")[1]);
      const timesTmp = [];
      let start = minStart;
      while (start < minEnd) {
        timesTmp.push(`${Math.trunc(start / 60)}`.padStart(2, "0")
          + ":"
          + `${Math.round(((start / 60) - Math.trunc(start / 60)) * 60)}`.padStart(2, "0"));
        start += Number(period);
      }
      setTimes(timesTmp);
    }
  }, [startTime, endTime, period]);

  const deleteItem = (item: string) => () => {
    setTimes(times.filter(time => time !== item));
  };

  const saveTime = () => {
    if(data) {
      schedule[data.format("DD-MM-YYYY")] = times;
    }
    console.log(times, schedule);
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
            value={data}
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
          <Typography mb={2}>{data ? data.format("DD-MM-YYYY") : "Date has not chosen yet"}</Typography>
          <Grid container spacing={1} mb={2} sx={{width: "400px"}}>
            {
              times.map((item, index) =>
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
          {times.length ? <Button onClick={saveTime}>Ok</Button> : null}
        </Box>
      </Box>
      <Button onClick={() => addSchedule(schedule, id)}>Update</Button>
      <Button onClick={() => getSchedule(id)}>Get</Button>
    </Box>
  );
};
