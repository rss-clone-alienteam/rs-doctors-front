import React from "react";
import { Routes, Route } from "react-router-dom";
import { About } from "./pages/About/About";
import { Home } from "./pages/Home/Home";
import { Notfound } from "./pages/Notfound/Notfound";
import { Layout } from "./components/Layout/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./themes/appTheme";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="*" element={<Notfound />}></Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
