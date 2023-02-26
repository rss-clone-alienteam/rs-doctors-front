import style from "./SignUpDoctor.module.scss";
import { useMutation } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { API } from "aws-amplify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { AuthService } from "../../../services/AuthService";
import {
  Box,
  Grid,
  TextField,
  Button,
  Link,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress
} from "@mui/material";
import { showToastMessage } from "../../../utils/showToastMessage";
import { Context } from "../../../Context/Context";

interface FormData {
  category: string;
  name: string;
  surname: string;
  city: string;
  email: string;
  password: string;
}

export interface IDoctor {
  id: string;
  name: string;
  surname: string;
  category: string;
  email: string;
  city: string;
}

const schema = object({
  category: string().required(),
  name: string().required(),
  surname: string().required(),
  city: string().required(),
  email: string().email().required(),
  password: string()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Please enter your password"),
});

export const SignUpDoctor = () => {

  const { isUserLogIn, profile, userID } = useContext(Context);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      category: "",
      name: "",
      surname: "",
      city: "",
      email: "",
      password: "",
    },
  });

  const mutationDB = useMutation(
    (data: IDoctor) => {
      return API.post("rs-doctors-back", "/doctors/add-doctor", {
        body: data,
      });
    },
    {
      onSuccess: (_, defaultValues) => {
        navigate(`/auth/sign-up-confirmation?email=${defaultValues.email}`);
      },
    }
  );

  const mutationAuth = useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      return await AuthService.signUp({
        email,
        password,
        profile: "doctor",
      });
    },
    {
      onError: () => {
        showToastMessage(mutationAuth.error instanceof Error ? mutationAuth.error.message : "", "error");
      },
    }
  );

  const onSubmit = handleSubmit(
    async ({ email, password, name, surname, city, category }) => {
      mutationAuth
        .mutateAsync({
          email,
          password,
        })
        .then((data) => {
          mutationDB.mutate({
            id: data.userSub,
            name,
            surname,
            category,
            email,
            city,
          });
        })
        .catch((error) => {
          showToastMessage(error, "error");
        });
    }
  );

  const [category, setCategory] = useState("");

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
    setErrorCategory(false);
  };

  const [city, setCity] = useState("");

  const handleChangeCity = (event: SelectChangeEvent) => {
    setCity(event.target.value);
    setErrorCity(false);
  };

  const [errorCity, setErrorCity] = useState(true);
  const [errorCategory, setErrorCategory] = useState(true);

  return (
    <>
      {mutationDB.isLoading ? (
        <CircularProgress size={80} sx={{ position: "fixed", top: "45vh", left: "45vw" }} />
      ) : (
        <>
          <Box component="form" onSubmit={onSubmit} className={style.form}>
            <Box
              sx={{
                color: "black",
                mt: 2,
                mb: 2,
                fontSize: "1.5rem",
                fontWeight: 300,
              }}
            >
              <h1>Create a doctor&apos;s account</h1>
            </Box>
            <Grid
              container
              sx={{
                p: 3,
                gap: 2,
                width: "100%",
                maxWidth: "500px",
                boxShadow: "0px 0px 24px -11px rgba(0, 0, 0, 0.3);",
                zIndex: 100,
                borderRadius: 2,
              }}
            >
              <Grid item sx={{ width: "100%" }}>
                <FormControl fullWidth required>
                  <InputLabel id="select-category">Category</InputLabel>
                  <Select
                    required
                    error={Boolean(errors.category?.message)}
                    value={category}
                    label="category"
                    {...register("category")}
                    onChange={handleChangeCategory}
                  >
                    <MenuItem value={"Gynecology"}>Gynecology</MenuItem>
                    <MenuItem value={"Surgery"}>Surgery</MenuItem>
                    <MenuItem value={"Cardiology"}>Cardiology</MenuItem>
                    <MenuItem value={"Therapeutology"}>Therapeutology</MenuItem>
                    <MenuItem value={"Pediatrics"}>Pediatrics</MenuItem>
                    <MenuItem value={"Allergology"}>Allergology</MenuItem>
                    <MenuItem value={"Dermatology"}>Dermatology</MenuItem>
                    <MenuItem value={"Dentistry"}>Dentistry</MenuItem>
                    <MenuItem value={"Psychology"}>Psychology</MenuItem>
                    <MenuItem value={"Neurology"}>Neurology</MenuItem>
                  </Select>
                  {errorCategory && (
                    <FormHelperText>This is required!</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <FormControl fullWidth required>
                  <InputLabel id="select-city">City</InputLabel>
                  <Select
                    error={Boolean(errors.city?.message)}
                    value={city}
                    label="city"
                    {...register("city")}
                    onChange={handleChangeCity}
                  >
                    <MenuItem value={"Warsaw"}>Warsaw</MenuItem>
                    <MenuItem value={"Krakow"}>Krakow</MenuItem>
                    <MenuItem value={"Wroclaw"}>Wroclaw</MenuItem>
                    <MenuItem value={"Gdansk"}>Gdansk</MenuItem>
                    <MenuItem value={"Poznan"}>Poznan</MenuItem>
                    <MenuItem value={"Katowice"}>Katowice</MenuItem>
                    <MenuItem value={"Bialystok"}>Bialystok</MenuItem>
                    <MenuItem value={"Szczecin"}>Szczecin</MenuItem>
                    <MenuItem value={"Lublin"}>Lublin</MenuItem>
                    <MenuItem value={"Rzeszow"}>Rzeszow</MenuItem>
                  </Select>
                  {errorCity && (
                    <FormHelperText>This is required!</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <TextField
                  fullWidth
                  size="small"
                  required
                  id="doc-name"
                  label="Name"
                  error={Boolean(errors.name?.message)}
                  helperText={errors.name?.message}
                  {...register("name")}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <TextField
                  fullWidth
                  size="small"
                  required
                  id="doc-last-name"
                  label="Last name"
                  error={Boolean(errors.surname?.message)}
                  helperText={errors.surname?.message}
                  {...register("surname")}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <TextField
                  fullWidth
                  size="small"
                  required
                  type="email"
                  id="doc-email"
                  label="Email"
                  error={Boolean(errors.email?.message)}
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
                  id="doc-password"
                  label="Password"
                  error={Boolean(errors.password?.message)}
                  helperText={errors.password?.message}
                  {...register("password")}
                />
              </Grid>
              <Grid
                item
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
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

            <Box
              sx={{ color: "black", mt: 2, mb: 2, display: "flex", gap: 0.5 }}
            >
              <span>Already have an account?</span>
              <Link to={isUserLogIn ?
                profile === "patient" ? `/patient-account/${userID}` : `/doctor-account/${userID}`
                : "/auth/sign-in"} component={NavLink}>
                Sign In
              </Link>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
