import { Grid, SelectChangeEvent } from "@mui/material";
import { SearchButton } from "../SearchButton/SearchButton";
import { SelectInput } from "../SelectInput/SelectInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Search.module.scss";

export const Search = () => {
  const [specialization, setSpecialization] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  return (
    <Grid container className={style.container}>
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
