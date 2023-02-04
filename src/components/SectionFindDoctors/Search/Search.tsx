import Box from "@mui/joy/Box";
import { SearchButton } from "../SearchButton/SearchButton";
import SelectInput from "../SelectInput/SelectInput";

export const Search = () => {
  return (
    <Box
      sx={{
        height: "100px",
        width: "60%",
        padding: "10px",
        backgroundColor: "rgba(0 0 0 /5%)",
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <SelectInput
        placeholder="Specialization"
        options={["Syrgery", "Gynecology", "Neurology"]}
      />
      <SelectInput
        placeholder="City"
        options={["Minsk", "Voronezh", "Warsaw"]}
      />

      <SearchButton />
    </Box>
  );
};
