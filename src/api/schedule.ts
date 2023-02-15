import { API } from "aws-amplify";

export interface ISchedule {
  [key: string]: Array<string>;
}

export const getSchedule = async (id?: string): Promise<ISchedule> => {
  const data = await API.get("rs-doctors-back", `/schedule/get-schedule/${id}`, {});
  return data;
};

export const addSchedule = async (schedule: ISchedule, id?: string) => {
  await API.post("rs-doctors-back", "/schedule/add-schedule", {
    body: {
      id,
      schedule
    },
  });
};
