import { Grid, SelectChangeEvent } from "@mui/material";
import { SearchButton } from "../SearchButton/SearchButton";
import { SelectInput } from "../SelectInput/SelectInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const [specialization, setSpecialization] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}
      sx={{
        height: { sx: "200px", md: "100px" },
        padding: "10px",
        backgroundColor: "rgba(0 0 0 /5%)",
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <Grid sx={{ display: "flex", gap: "5px", flexDirection: { sx: "column", md: "row" } }}>
        <SelectInput
          placeholder="Specialization"
          options={["Alergolog", "Surgery", "Gynecology", "Neurology"]}
          value={specialization}
          onChange={(event: SelectChangeEvent) => setSpecialization(event.target.value)}
        />
        <SelectInput
          placeholder="City"
          options={["Krakow", "Minsk", "Voronezh", "Warsaw"]}
          value={city}
          onChange={(event: SelectChangeEvent) => setCity(event.target.value)}
        />
      </Grid>
      <Grid>
        <SearchButton
          onClick={() => {
            navigate(`/doctors?specialization=${specialization}&city=${city}`);
          }}
        />
        <Grid />
      </Grid>
    </Grid>
  );
};
