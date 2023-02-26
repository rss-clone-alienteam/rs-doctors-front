import { Alert, Button, Snackbar } from "@mui/material";
import { Box } from "@mui/joy";
import { AuthService } from "../../../services/AuthService";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

interface IResetPassForm {
  code: string;
  newPassword: string;
  email?: string;
}

export const ResetPasswordModal = () => {
  const navigate = useNavigate();
  const [errMessage, setErrorMessage] = useState("Try Again Later");

  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(false);
  const [isEmailExist, setEmailExist] = useState(false);

  const schema = yup.object({
    code: yup
      .string()
      .matches(/^\d{6,7}/, "Only 6 digits")
      .required("Code has contain 6 numbers"),
    newPassword: yup
      .string()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      )
      .required("Please enter your password"),
    email: yup.string().email().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPassForm>({
    mode: "onBlur",

    resolver: yupResolver(schema),
  });

  const passRecovery = async () => {
    try {
      await AuthService.requestRecoveryPassword({ email });
      setError(false);
      setEmailExist(true);
    } catch {
      setError(true);
      setEmailExist(false);
    }
  };

  const submitNewPass = handleSubmit(async () => {
    try {
      await AuthService.changePasswordSubmit({ email, code, newPassword });
      setOpenErrorMessage(false);
      handleClick();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      const error = JSON.stringify(err);
      setErrorMessage(error);
      handleClick();
      setOpenErrorMessage(true);
      console.log(13, JSON.parse(errMessage));
    }
  });

  return (
    <Box sx={{ display: "flex", alignItems: "center" }} >
      <Grid
        sx={{
          m: 2,
          p: 2,
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0px 0px 24px -11px rgba(0, 0, 0, 0.3);",
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Grid item sx={{ width: "100%" }}>
          <TextField
            fullWidth
            size="small"
            required
            type={email}
            label="Email"
            value={email}
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Button onClick={passRecovery}>Change password</Button>
        {error && (
          <Box component="span" sx={{ color: "red", textAlign: "center" }}>
            We do not have this e-mail
          </Box>
        )}
        {isEmailExist && (
          <>
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid item sx={{ width: "100%" }}>
                <TextField
                  fullWidth
                  size="small"
                  required
                  label="Code"
                  value={code}
                  {...register("code")}
                  error={!!errors.code}
                  helperText={errors.code?.message}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <TextField
                  fullWidth
                  size="small"
                  type={"password"}
                  required
                  label="New Password"
                  value={newPassword}
                  {...register("newPassword")}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button onClick={submitNewPass}>Submit</Button>
          </>
        )}
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleClose}
      >
        {!openErrorMessage ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            The password has successfully changed!
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errMessage}
          </Alert>
        )}
      </Snackbar>
    </Box >
  );
};
