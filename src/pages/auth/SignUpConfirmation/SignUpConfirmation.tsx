import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { AuthService } from '../../../services/AuthService';

interface ConfirmationData {
  code: string;
}

const schema = object({
  code: string().required(),
});

export const SignUpConfirmation = () => {
  const [ searchParams ] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email') || '';
  useEffect(() => {
    if (!email) {
      navigate('/');
    }
  }, [email, navigate]);
  const { register, handleSubmit, formState: { errors } } = useForm<ConfirmationData>({
    resolver: yupResolver(schema),
    defaultValues: {
      code: ''
    }
  });

  const onSubmit = handleSubmit(async ({ code }) => {
    try {
      await AuthService.confirmSignUp({ email, code });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="code" {...register("code")} />
      <p>{errors.code?.message}</p>
      <button type="submit">Submit</button>
    </form>
  );
};

