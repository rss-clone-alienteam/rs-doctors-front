import style from "./SignUpDoctor.module.scss";
import { useMutation } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API } from "aws-amplify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { AuthService } from "../../../services/AuthService";
import { Box, Grid, TextField, Button, Link, Snackbar, Alert } from "@mui/material";

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
  const [openErrorMessage, setOpenErrorMessage] = useState(false);
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
    async ({email, password}: {email: string, password: string}) => {
      return await AuthService.signUp({
        email,
        password,
        profile: "doctor",
      });
    },
    {
      onError: () => {
        setOpenErrorMessage(true);
      },
    }
  );

  const onSubmit = handleSubmit(
    async ({ email, password, name, surname, city, category }) => {
      mutationAuth.mutateAsync({
        email,
        password,
      }).then(data => {
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
        console.log(error);
      });
    },
  );

  return (
    <>
      {mutationDB.isLoading ? (
         "Loading..."
       ) : (
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
              <h1>Create an account</h1>
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
                <TextField
                  fullWidth
                  size="small"
                  required
                  id="doc-category"
                  label="Category"
                  helperText={errors.category?.message}
                  {...register("category")}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <TextField
                  fullWidth
                  size="small"
                  required
                  id="doc-name"
                  label="Name"
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
                  helperText={errors.surname?.message}
                  {...register("surname")}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <TextField
                  fullWidth
                  size="small"
                  required
                  id="doc-city"
                  label="City"
                  helperText={errors.city?.message}
                  {...register("city")}
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
              <Link to={"/auth/sign-in"} component={NavLink}>Sign In</Link>
            </Box>
          </Box>
          <Snackbar
            open={openErrorMessage}
            autoHideDuration={6000}
            onClose={() => setOpenErrorMessage(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={() => setOpenErrorMessage(false)} severity="error">
              {
               mutationAuth.error instanceof Error ? mutationAuth.error.message : ""
              }
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
};
