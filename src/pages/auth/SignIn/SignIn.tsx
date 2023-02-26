import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { AuthService } from "../../../services/AuthService";
import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { ResetPasswordModal } from "./ResetPasswordModal";
import { Modal } from "../../../components/Modal/Modal";
import style from "./SignIn.module.scss";
import { Context } from "../../../Context/Context";
import { showToastMessage } from "../../../utils/showToastMessage";

interface UserData {
  email: string;
  password: string;
}

const schema = object({
  email: string().email().required(),
  password: string().required(),
});

export const SignIn = () => {
  const navigate = useNavigate();
  const { setIsUserLogIn, setUserEmail, setUserID, setProfile } = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation(

    async ({ email, password }: UserData) => {
      const user = await AuthService.signIn({ email, password });
      return user;
    },
    {
      onSuccess: (user) => {
        setIsUserLogIn(true);
        setUserID(user.attributes.sub);
        setUserEmail(user.attributes.email);
        setProfile(user.attributes.profile);
        showToastMessage("You are successfully login", "success");

        if (user.attributes.profile === "doctor") {
          navigate(`/doctor-account/${user.attributes.sub}`);
          return;
        }
        if (window.sessionStorage.getItem("path")) {
          navigate(`${window.sessionStorage.getItem("path")}`);
          sessionStorage.clear();
        } else {
          navigate(`/patient-account/${user.attributes.sub}`);
        }
      },
      onError: (error, variables) => {
        if (error instanceof Error && error.message === "User is not confirmed.") {
          showToastMessage(error.message, "error");
          navigate(`/auth/sign-up-confirmation?email=${variables.email}`);
        } else {
          showToastMessage(error instanceof Error ? error.message : "", "error");
        }
        setIsUserLogIn(false);
      },
    }
  );

  const onSubmit = handleSubmit(({ email, password }) => {
    email = email.toLowerCase();
    mutation.mutate({
      email,
      password,
    });
  });

  const [isOpen, setOpen] = useState(false);

  const openPasswordRecoveryModal = () => setOpen(true);

  const closePasswordRecoveryModal = () => setOpen(false);

  return (
    <>
      {!mutation.isLoading && (
        <Box component="form" onSubmit={onSubmit} className={style.form}>
          <h1 className={style.caption}>Enter to your account</h1>
          <Grid
            container
            sx={{
              p: 3,
              width: "100%",
              maxWidth: "400px",
              boxShadow: "0px 0px 24px -11px rgba(0, 0, 0, 0.3);",
              borderRadius: 3,
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <Grid item sx={{ width: "100%" }}>
              <TextField
                fullWidth
                size="small"
                required
                label="Email"
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register("email")}
              />
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <TextField
                type={"password"}
                fullWidth
                size="small"
                required
                label="Password"
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                {...register("password")}
              />
            </Grid>
            <Button
              variant="outlined"
              type="submit"
              size="large"
              sx={{ mt: 2 }}
              onClick={onSubmit}
            >
              Log in
            </Button>
          </Grid>
          <Button sx={{ mr: 2 }} onClick={openPasswordRecoveryModal}>
            Forgot password
          </Button>
          <Modal
            open={isOpen}
            onClose={closePasswordRecoveryModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ResetPasswordModal />
          </Modal>
        </Box>
      )}
      {mutation.isLoading && (
        <CircularProgress
          size={120}
          sx={{ position: "fixed", top: "45vh", left: "35vw" }}
        />
      )}
    </>
  );
};
