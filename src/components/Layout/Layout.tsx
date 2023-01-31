import { NavLink, Outlet } from "react-router-dom";
import style from "./Layout.module.scss";

interface IActivePending {
  isActive: boolean;
  isPending: boolean;
}

const setActive = ({ isActive }: IActivePending) =>
  isActive ? "active-link" : "";

const Layout = () => {
  return (
    <>
      <header className={style.header}>
        <NavLink to="/" className={setActive}>
          Home
        </NavLink>
        <NavLink to="/about" className={setActive}>
          About us
        </NavLink>
      </header>

      <main className={style.container}>
        <Outlet />
      </main>

      <footer className={style.footer}>2023</footer>
    </>
  );
};

export { Layout };
