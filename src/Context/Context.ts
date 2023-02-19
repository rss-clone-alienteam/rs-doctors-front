import { createContext } from "react";

type SetValue<T> = (val: T) => void;

export interface IContext {
  isUserLogIn: boolean;
  setIsUserLogIn: SetValue<boolean>;
  userID: string;
  setUserID: SetValue<string>;
  userEmail: string;
  setUserEmail: SetValue<string>;
}

export const Context = createContext<IContext>({} as IContext);
