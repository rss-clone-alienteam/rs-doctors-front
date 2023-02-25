import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { Context } from "../../Context/Context";
import { AuthService } from "../../services/AuthService";
import style from "./LogOutBanner.module.scss";

export const LogOutBanner = () => {

  const { setIsUserLogIn, userEmail, setProfile } = useContext(Context);
  const navigate = useNavigate();
  const logOut = () => {
    AuthService.signOut();
    setIsUserLogIn(false);
    setProfile("");
    navigate("/");
  };

  return (
    <Box className={style.caption}>
      <Box sx={{ display: "flex", flexDirection: "column", fontSize: { xs: "11px", sm: "15px" } }}>
        <Typography color="secondary" sx={{ fontSize: { xs: "13px", sm: "20px" }, fontWeight: 300 }}>
          You logged in as:
        </Typography>
        <Typography sx={{ fontSize: { xs: "13px", sm: "20px" }, fontWeight: 300 }}>
          {userEmail}
        </Typography>
      </Box>

      <Button color="secondary" variant="contained" sx={{ fontSize: { xs: "10px", sm: "15px" } }} onClick={() => logOut()}>
        Log Out
      </Button>
    </Box>
  );
};


