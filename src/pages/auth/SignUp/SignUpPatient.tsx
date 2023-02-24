import style from "./SignUpDoctor.module.scss";
import { useMutation } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { API } from "aws-amplify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { AuthService } from "../../../services/AuthService";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../../../Context/Context";

interface FormData {
  name: string;
  lastName: string;
  city: string;
  email: string;
  password: string;
}

export interface IPatient {
  id: string;
  name: string;
  lastName: string;
  email: string;
  city: string;
}

const schema = object({
  name: string().required(),
  lastName: string().required(),
  city: string().required(),
  email: string().email().required(),
  password: string()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Please enter your password"),
});

export const SignUpPatient = () => {

  const { isUserLogIn, profile, userID } = useContext(Context);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const mutation = useMutation(
    (data: IPatient) => {
      return API.post("rs-doctors-back", "/patients/add-patient", {
        body: data,
      });
    },
    {
      onSuccess: (_, defaultValues) => {
        navigate(`/auth/sign-up-confirmation?email=${defaultValues.email}`);
      },
    }
  );

  const onSubmit = handleSubmit(
    async ({ email, password, city, name, lastName }) => {
      try {
        const patientData = await AuthService.signUp({
          email,
          password,
          profile: "patient",
        });
        const username = patientData.user.getUsername();
        mutation.mutate({
          id: patientData.userSub,
          name: name,
          lastName: lastName,
          email: username,
          city: city,
        });
      } catch (err) {
        console.log(err);
      }
    }
  );

  const [city, setCity] = React.useState("");

  const handleChangeCity = (event: SelectChangeEvent) => {
    setCity(event.target.value);
    setErrorCity(false);
  };

  const [errorCity, setErrorCity] = React.useState(true);

  return (
    <>
      <Box component="form" onSubmit={onSubmit} className={style.form}>
        <Box
          sx={{
            color: "black",
            mt: 2,
            mb: 2,
            fontSize: "2rem",
            fontWeight: 300,
          }}
        >
          <h1>Create a patient&apos;s account</h1>
        </Box>
        <Grid
          container
          sx={{
            mt: 1,
            pl: 2,
            pr: 3.5,
            pt: 3,
            pb: 4,
            width: "100%",
            maxWidth: "500px",
            boxShadow: "0px 0px 24px -11px rgba(0, 0, 0, 0.3);",
            zIndex: 100,
            borderRadius: 1,
          }}
          spacing={2}
        >
          <Grid item sx={{ width: "100%" }}>
            <FormControl fullWidth required>
              <InputLabel id="select-city">City</InputLabel>
              <Select
                error={!!errors.city?.message}
                value={city}
                label="city"
                {...register("city")}
                onChange={handleChangeCity}
              >
                <MenuItem value={"Warsaw"}>Warsaw</MenuItem>
                <MenuItem value={"Krakow"}>Krakow</MenuItem>
                <MenuItem value={"Minsk"}>Minsk</MenuItem>
                <MenuItem value={"Gomel"}>Gomel</MenuItem>
                <MenuItem value={"Voronezh"}>Voronezh</MenuItem>
                <MenuItem value={"New York"}>New York</MenuItem>
              </Select>
              {errorCity && <FormHelperText>This is required!</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <TextField
              fullWidth
              size="small"
              required
              id="outlined-required"
              label="Name"
              error={!!errors.name?.message}
              helperText={errors.lastName?.message}
              {...register("name")}
            />
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <TextField
              fullWidth
              size="small"
              required
              id="outlined-required"
              label="Last name"
              error={!!errors.lastName?.message}
              helperText={errors.lastName?.message}
              {...register("lastName")}
            />
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <TextField
              fullWidth
              size="small"
              required
              type="email"
              id="outlined-required"
              label="Email"
              error={!!errors.email?.message}
              helperText={errors.email?.message}
              {...register("email")}
            />
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <TextField
              fullWidth
              size="small"
              required
              type="password"
              id="outlined-required"
              label="Password"
              error={!!errors.password?.message}
              helperText={errors.password?.message}
              {...register("password")}
            />
          </Grid>
          <Grid
            item
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="outlined"
              type="submit"
              size="large"
              sx={{ mt: 2 }}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ color: "black", mt: 2, mb: 2, display: "flex", gap: 0.5 }}>
          <span>Already have an account?</span>
          <Link to={isUserLogIn ?
            profile === "patient" ? `/patient-account/${userID}` : `/doctor-account/${userID}`
            : "/auth/sign-in"} component={NavLink}>
            Sign In
          </Link>
        </Box>
      </Box>
    </>
  );
};
