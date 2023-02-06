import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import style from "./Layout.module.scss";
const Layout = () => {
  return (
    <>
      <Header />
      <Container component="main" className={style.container}>
        <Outlet />
      </Container>

      <footer className={style.footer}>2023</footer>
    </>
  );
};

export { Layout };
