
import style from "./Footer.module.scss";
import Grid from "@mui/material/Grid";
import { ReactComponent as RssLogo } from "../../assets/rss_black.svg";
import { ReactComponent as GitLogo } from "../../assets/git_black.svg";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box component="footer" className={style.footer}>
      <Grid container spacing={0} className={style.footerWrapper} sx={{ flexDirection: { xs: "column", sm: "row" } }}>
        <Grid sx={{ display: { xs: "none", sm: "block" } }}>
          <NavLink to={"https://rs.school/"}>
            <RssLogo className={style.rssLogo} />
          </NavLink>
        </Grid>
        <Grid sx={{ display: "flex", gap: 1 }}>
          <NavLink to={"https://github.com/ShArPman13"}>
            <Box className={style.gitBox}>
              <GitLogo className={style.gitLogo} />
              <Box component={"span"}>ShArPman13</Box>
            </Box>
          </NavLink>
          <NavLink to={"https://github.com/shutikate"}>
            <Box className={style.gitBox}>
              <GitLogo className={style.gitLogo} />
              <Box component={"span"}>Shutikate</Box>
            </Box>
          </NavLink>
          <NavLink to={"https://github.com/gutsstas"}>
            <Box className={style.gitBox}>
              <GitLogo className={style.gitLogo} />
              <Box component={"span"}>Gutsstas</Box>
            </Box>
          </NavLink>
        </Grid>
        <Grid sx={{ opacity: 0.5 }}>
          2023
        </Grid>
      </Grid>
    </Box >
  );
};

export { Footer };
