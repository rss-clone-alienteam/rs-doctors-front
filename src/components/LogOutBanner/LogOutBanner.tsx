import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { Context } from "../../Context/Context";
import { AuthService } from "../../services/AuthService";
import style from "./LogOutBanner.module.scss";

export const LogOutBanner = () => {

  const { setIsUserLogIn, userEmail } = useContext(Context);
  const navigate = useNavigate();
  const logOut = () => {
    AuthService.signOut();
    setIsUserLogIn(false);
    navigate("/");
  };

  return (
    <Box className={style.caption}>
      <Typography className={style.text}>
        You logged in as {userEmail}
      </Typography>
      <Button color="error" variant="contained" onClick={() => logOut()}>
        Log Out
      </Button>
    </Box>
  );
};


