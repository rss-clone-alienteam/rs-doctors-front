import { NavLink } from "react-router-dom";
import Box from "@mui/joy/Box";
import { HeaderButton } from "./HeaderButton/HeaderButton";
import style from "./Header.module.scss";
import logo from "../../assets/logo.png";
import Grid from "@mui/material/Grid";
import RegisterButton from "./RegisterButton/RegisterButton";
import { useContext } from "react";
import { Context } from "../../Context/Context";

const Header = () => {
  const { isUserLogIn, userID, profile } = useContext(Context);

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
        {/* <NavLink to="/ask-doctor">Ask the Doctor</NavLink> */}
        <Grid item className={style.navWrapper}>
          <RegisterButton />
          {isUserLogIn ? (
            <NavLink to={`/${profile}-account/${userID}`}>
              <HeaderButton text="My Profile" />
            </NavLink>
          ) : (
            <NavLink to="/auth/sign-in">
              <HeaderButton text="Sign In" />
            </NavLink>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export { Header };
