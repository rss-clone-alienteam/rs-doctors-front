
import style from "./Footer.module.scss";
import Grid from "@mui/material/Grid";
import { ReactComponent as RssLogo } from "../../assets/rss_black.svg";
import { ReactComponent as GitLogo } from "../../assets/git_black.svg";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box component="footer" className={style.footer}>
      <Grid container spacing={0} className={style.footerWrapper}>
        <Grid>
          <NavLink to={"https://rs.school/"}>
            <RssLogo />
          </NavLink>
        </Grid>
        <Grid sx={{ display: "flex", gap: 3 }}>
          <NavLink to={"https://github.com/ShArPman13"}>
            <Box className={style.gitBox}>
              <GitLogo />
              <Box component={"span"}>ShArPman13</Box>
            </Box>
          </NavLink>
          <NavLink to={"https://github.com/shutikate"}>
            <Box className={style.gitBox}>
              <GitLogo />
              <Box component={"span"}>shutikate</Box>
            </Box>
          </NavLink>
          <NavLink to={"https://github.com/gutsstas"}>
            <Box className={style.gitBox}>
              <GitLogo />
              <Box component={"span"}>gutsstas</Box>
            </Box>
          </NavLink>
        </Grid>
        <Grid>
          2023
        </Grid>
      </Grid>
    </Box >
  );
};

export { Footer };
