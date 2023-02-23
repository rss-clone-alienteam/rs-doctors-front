import style from "./Notfound.module.scss";
import { Link } from "react-router-dom";
import img404 from "../../assets/404_mountains.png";
import { Box } from "@mui/material";

const Notfound = () => {
  return (
    <Box className={style.container}>
      <Box component={"img"} src={img404} className={style.img}></Box>
      <Box component={"h1"} className={style.text}>
        This page does not exist. Go{" "}
        <Link to="/" className={style.link}>
          Home
        </Link>
      </Box>
    </Box>
  );
};

export { Notfound };
