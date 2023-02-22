import { createContext } from "react";
import { IDoctor } from "../api/doctors";

type SetValue<T> = (val: T) => void;

export interface IPatientAppointment {
  date: string;
  time: string;
  doctor: IDoctor;
}

export interface IContext {
  isUserLogIn: boolean;
  setIsUserLogIn: SetValue<boolean>;
  userID: string;
  setUserID: SetValue<string>;
  userEmail: string;
  setUserEmail: SetValue<string>;
  profile: string;
  setProfile: SetValue<string>;
  appointment: IPatientAppointment;
  setAppointment: SetValue<IPatientAppointment>;
}

export const Context = createContext<IContext>({} as IContext);
