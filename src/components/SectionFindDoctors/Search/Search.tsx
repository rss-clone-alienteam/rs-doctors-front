import { Grid, SelectChangeEvent } from "@mui/material";
import { SearchButton } from "../SearchButton/SearchButton";
import { SelectInput } from "../SelectInput/SelectInput";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import style from "./Search.module.scss";

export const Search = () => {
  const [searchParams] = useSearchParams();

  const [specialization, setSpecialization] = useState(searchParams.get("specialization") || "Gynecology");
  const [city, setCity] = useState(searchParams.get("city") || "Warsaw");
  const navigate = useNavigate();

  return (
    <Grid container className={style.container}>
      <SelectInput
        placeholder="Specialization"
        options={["Gynecology", "Surgery", "Cardiology", "Therapeutology", "Pediatrics", "Allergology", "Dermatology", "Dentistry", "Psychology", "Neurology"]}
        value={specialization}
        onChange={(event: SelectChangeEvent) => setSpecialization(event.target.value)}
      />
      <SelectInput
        placeholder="City"
        options={["Warsaw", "Krakow", "Wroclaw", "Gdansk", "Poznan", "Katowice", "Bialystok", "Szczecin", "Lublin", "Rzeszow"]}
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
