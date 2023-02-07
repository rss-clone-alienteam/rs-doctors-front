import { NavLink } from "react-router-dom";
import Box from "@mui/joy/Box";
import { HeaderButton } from "./HeaderButton/HeaderButton";
import style from "./Header.module.scss";
import logo from "../../assets/logo.png";
import Grid from "@mui/material/Grid";

interface IActivePending {
  isActive: boolean;
  isPending: boolean;
}

const setActive = ({ isActive }: IActivePending) =>
  isActive ? "active-link" : "";

const Header = () => {
  return (
    <Box component="header" className={style.header}>
      <Grid container spacing={0} className={style.headerWrapper}>
        <Grid
          item
          component="img"
          sx={{ width: "250px" }}
          src={logo}
          alt="logo"
        />
        <Grid item className={style.navWrapper}>
          <NavLink to="/" className={setActive}>
            Home
          </NavLink>
          <NavLink to="/about" className={setActive}>
            About Us
          </NavLink>
          <NavLink to="/auth/sign-up-doctor">
            <HeaderButton />
          </NavLink>
        </Grid>
      </Grid>
    </Box>
  );
};

export { Header };
