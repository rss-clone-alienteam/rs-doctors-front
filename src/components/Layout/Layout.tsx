import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import style from "./Layout.module.scss";
const Layout = () => {
  return (
    <>
      <Header />
      <main className={style.container}>
        <Outlet />
      </main>

      <footer className={style.footer}>2023</footer>
    </>
  );
};

export { Layout };
