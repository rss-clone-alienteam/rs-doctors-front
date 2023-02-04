import { NavLink } from "react-router-dom";
import Box from "@mui/joy/Box";
import { HeaderButton } from "./HeaderButton/HeaderButton";
import style from "./Header.module.scss";
import logo from "../../assets/logo.png";

interface IActivePending {
  isActive: boolean;
  isPending: boolean;
}

const setActive = ({ isActive }: IActivePending) =>
  isActive ? "active-link" : "";

const Header = () => {
  return (
    <Box className={style.header}>
      <Box className={style.headerWrapper}>
        <img className={style.logo} src={logo} alt="logo" />
        <Box className={style.navWrapper}>
          <NavLink to="/" className={setActive}>
            Home
          </NavLink>
          <NavLink to="/about" className={setActive}>
            About Us
          </NavLink>

          <HeaderButton />
        </Box>
      </Box>
    </Box>
  );
};

export { Header };
