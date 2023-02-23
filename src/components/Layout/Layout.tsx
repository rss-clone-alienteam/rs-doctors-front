import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import style from "./Layout.module.scss";
const Layout = () => {
  return (
    <Box className={style.container}>
      <Header />
      <Container component="main" className={style.mainContainer}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export { Layout };
