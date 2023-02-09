import { Box, SelectChangeEvent } from "@mui/material";
import { SearchButton } from "../SearchButton/SearchButton";
import { SelectInput } from "../SelectInput/SelectInput";
import { useState } from "react";
import { getDoctors } from "../../../api/doctors";

export const Search = () => {
  const [specialization, setSpecialization] = useState("");
  const [city, setCity] = useState("");

  return (
    <Box
      sx={{
        height: "100px",
        padding: "10px",
        backgroundColor: "rgba(0 0 0 /5%)",
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <SelectInput
        placeholder="Specialization"
        options={["Alergolog", "Surgery", "Gynecology", "Neurology"]}
        value={specialization}
        onChange={(event: SelectChangeEvent) =>
          setSpecialization(event.target.value)
        }
      />
      <SelectInput
        placeholder="City"
        options={["Krakow", "Minsk", "Voronezh", "Warsaw"]}
        value={city}
        onChange={(event: SelectChangeEvent) => setCity(event.target.value)}
      />
      <SearchButton onClick={() => getDoctors(specialization, city)} />
    </Box>
  );
};
