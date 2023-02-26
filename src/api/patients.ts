import { API } from "aws-amplify";

export type Appointment = {
  doctorID: string;
  doctorName: string;
  doctorSurname: string;
  day: string;
  time: string;
};

export interface IPatient {
  city: string;
  email: string;
  id: string;
  name: string;
  lastName: string;
  appointments: Appointment[];
}

export const getPatient = async (id?: string): Promise<IPatient> => {
  const data = API.get("rs-doctors-back", `/patients/get-patient/${id}`, {});
  return data;
};

export const updatePatient = async (
  id?: string,
  body?: Partial<IPatient>
): Promise<Appointment> => {
  const data = await API.patch(
    "rs-doctors-back",
    `/patients/update-patient/${id}`,
    {
      body,
    }
  );
  return data;
};
