import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { AuthService } from "../../../services/AuthService";
import { Button } from "@mui/material";
import { useState } from "react";
import { ResetPasswordModal } from "./ResetPasswordModal";
import { Modal } from "../../../components/Modal/Modal";

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
      console.log(user);
      return user;
    },
    {
      onSuccess: (user) => {
        user.attributes.profile === "doctor"
          ? navigate(`/doctor-account/${user.attributes.sub}`)
          : navigate(`/patient-account/${user.attributes.sub}`);
      },
    }
  );

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      mutation.mutate({
        email,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  });

  const [isOpen, setOpen] = useState(false);

  const openPasswordRecoveryModal = () => setOpen(true);

  const closePasswordRecoveryModal = () => setOpen(false);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="email" {...register("email")} />
        <p>{errors.email?.message}</p>
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        <button type="submit">Log in</button>
      </form>
      <Button onClick={openPasswordRecoveryModal}>Forgot password</Button>
      <Modal
        open={isOpen}
        onClose={closePasswordRecoveryModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ResetPasswordModal />
      </Modal>
    </>
  );
};
