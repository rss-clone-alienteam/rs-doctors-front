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
  const { setIsUserLogIn } = useContext(Context);

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

  const { isLoading, mutate } = useMutation(
    async ({ email, password }: UserData) => {
      const user = await AuthService.signIn({ email, password });
      return user;
    },
    {
      onSuccess: (user) => {
        setIsUserLogIn(true);
        user.attributes.profile === "doctor"
          ? navigate(`/doctor-account/${user.attributes.sub}`)
          : navigate(`/patient-account/${user.attributes.sub}`);
      },
      onError: (errorAuth) => {
        console.log(errorAuth);
        setIsUserLogIn(false);
      },
    }
  );

  const onSubmit = handleSubmit(({ email, password }) => {
    mutate({
      email,
      password,
    });
  });

  const [isOpen, setOpen] = useState(false);

  const openPasswordRecoveryModal = () => setOpen(true);

  const closePasswordRecoveryModal = () => setOpen(false);

  return (
    <>
      {!isLoading && (
        <Box component="form" onSubmit={onSubmit} className={style.form}>
          <Grid
            container
            sx={{
              mt: 1,
              pl: 2,
              pr: 3.5,
              pt: 3,
              pb: 4,
              width: "100%",
              maxWidth: "400px",
              boxShadow: "0px 0px 24px -11px rgba(0, 0, 0, 0.3);",
              zIndex: 100,
              borderRadius: 3,
              display: "flex",
              justifyContent: "center",
            }}
            spacing={2}
          >
            <Grid item sx={{ width: "100%" }}>
              <TextField
                fullWidth
                size="small"
                required
                id="outlined-required"
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
                id="outlined-required"
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
      {isLoading && (
        <CircularProgress
          size={120}
          sx={{ position: "fixed", top: "45vh", left: "45vw" }}
        />
      )}
    </>
  );
};
