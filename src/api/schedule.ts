import { API } from "aws-amplify";

export type ITimes = {
  [key: string]: string | null;
}

export type IAppointments = {
  [key: string]: ITimes;
};

export type ISchedule = {
  id?: string;
  schedule: IAppointments;
}

export const getSchedule = async (id?: string): Promise<ISchedule> => {
  const data: ISchedule = await API.get("rs-doctors-back", `/schedule/get-schedule/${id}`, {});
  console.log(data);
  return data;
};

export const addSchedule = async (schedule: IAppointments, id?: string) => {
  await API.post("rs-doctors-back", "/schedule/add-schedule", {
    body: {
      id,
      schedule
    },
  });
};
