import React, { createContext } from "react";

export interface IContext {
  tokenAccess: string;
  tokenId: string;
  tokenRefresh: string;
}

export const initialValue: IContext = {
  tokenAccess: "",
  tokenId: "",
  tokenRefresh: "",
};

export const Context = createContext(initialValue);
