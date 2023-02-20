import { API } from "aws-amplify";

type Appointment = {
  appointments: {
    doctorID: string;
    day: string;
    time: string;
  };
};

export interface IPatient {
  city: string;
  email: string;
  id: string;
  name: string;
  surname: string;
  appointments: Appointment;
}

export const getPatient = async (id?: string): Promise<IPatient> => {
  const data = API.get("rs-doctors-back", `/patients/get-patient/${id}`, {});
  return data;
};

export const updatePatient = async (
  id?: string,
  body?: Appointment
): Promise<IPatient> => {
  const data = await API.patch(
    "rs-doctors-back",
    `/patients/update-patient/${id}`,
    {
      body,
    }
  );
  return data;
};
