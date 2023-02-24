import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import style from "./Layout.module.scss";
const Layout = () => {
  return (
    <Box className={style.container}>
      <Header />
      <Container sx={{padding: 0}} component="main">
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export { Layout };
