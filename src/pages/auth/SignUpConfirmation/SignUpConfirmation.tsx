import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { AuthService } from "../../../services/AuthService";
import { Button, Box, TextField } from "@mui/material";
import style from "./SignUpConfirmation.module.scss";
import { showToastMessage } from "../../../utils/showToastMessage";
import { ToastContainer } from "react-toastify";

interface ConfirmationData {
  code: string;
}

const schema = object({
  code: string().required(),
});

export const SignUpConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email") || "";
  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmationData>({
    resolver: yupResolver(schema),
    defaultValues: {
      code: "",
    },
  });

  const mutation = useMutation(
    (code: string) => {
      return AuthService.confirmSignUp({ email, code });
    },
    {
      onSuccess: () => {
        showToastMessage("Success", "success");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      },
      onError: () => {
        showToastMessage("Wrong code", "error");
      },
    }
  );

  const onSubmit = handleSubmit(async ({ code }) => {
    try {
      mutation.mutate(code);
    } catch (err) {
      console.log(err);
    }
  });

  const resend = () => {
    showToastMessage("New code has sent!", "success");
    AuthService.resendSignUp({ email });
  };

  return (
    <Box className={style.container}>
      <Box component={"form"} onSubmit={onSubmit} className={style.form}>
        <TextField
          size="small"
          required
          id="outlined-required"
          label="Code"
          error={!!errors.code}
          helperText={errors.code?.message}
          {...register("code")} />
        <Button variant="contained" sx={{ color: "white" }} type="submit">Submit</Button>
      </Box>
      <Box>
        <Box component={"span"} sx={{ color: "black" }}>
          Did not get the code?
        </Box>
        <Button variant="text" color="primary" onClick={resend}>
          Resend code
        </Button>
      </Box>
      <ToastContainer />
    </Box>
  );
};
