import { Amplify } from "aws-amplify";
import config from "./amplify.config";
import React from "react";
import ReactDOM from "react-dom/client";
import "./style.scss";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

Amplify.configure(config)
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
