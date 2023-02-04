import Box from "@mui/joy/Box";
import { CaptionText } from "./CaptionText/CaptionText";
import { Search } from "./Search/Search";
import style from "./SectionFindDoctors.module.scss";

export const SectionFindDoctors = () => {
  return (
    <Box className={style.container}>
      <Box
        sx={{
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <CaptionText />
        <Search />
      </Box>
    </Box>
  );
};
