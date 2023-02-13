import { API } from "aws-amplify";

export interface IPatient {
  city: string;
  email: string;
  id: string;
  name: string;
  surname: string;
}

export const getPatient = async (id?: string): Promise<IPatient> => {
  const data = API.get("rs-doctors-back", `/patients/get-patient/${id}`, {});
  return data;
};
