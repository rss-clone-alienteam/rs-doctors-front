import { NavLink } from "react-router-dom";
import Box from "@mui/joy/Box";
import { HeaderButton } from "./HeaderButton/HeaderButton";
import style from "./Header.module.scss";
import logo from "../../assets/logo.png";
import Grid from "@mui/material/Grid";
import RegisterButton from "./RegisterButton/RegisterButton";

const Header = () => {
  const text = "Sign In";

  return (
    <Box component="header" className={style.header}>
      <Grid container spacing={0} className={style.headerWrapper}>
        <NavLink to="/">
          <Grid
            item
            component="img"
            sx={{ width: "250px" }}
            src={logo}
            alt="logo"
          />
        </NavLink>
        <NavLink to="/ask-doctor">Ask the Doctor</NavLink>
        <Grid item className={style.navWrapper}>
          <RegisterButton />
          <NavLink to="/auth/sign-in">
            <HeaderButton text={text} />
          </NavLink>
        </Grid>
      </Grid>
    </Box>
  );
};

export { Header };
