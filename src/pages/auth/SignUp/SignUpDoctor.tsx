import style from "./SignUpDoctor.module.scss";
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import { API } from "aws-amplify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { AuthService } from '../../../services/AuthService';

interface FormData {
  category: string;
  name: string;
  surname: string;
  city: string;
  email: string;
  password: string;
}

interface IDoctor {
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
  password:
    string()
    .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character")
    .required("Please enter your password"),
});

export const SignUpDoctor = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      category: '',
      name: '',
      surname: '',
      city: '',
      email: '',
      password: '',
    }
  });

  const mutation = useMutation((data: IDoctor) => {
    return API.post("rs-doctors-back", "/doctors/add-doctor", {
      body: data
    });
  }, {
    onSuccess: (_, defaultValues) => {
      navigate(`/auth/sign-up-confirmation?email=${defaultValues.email}`);
    },
  });

  const onSubmit = handleSubmit(async ({ email, password, name, surname, city, category }) => {
    try {
      const doctorData = await AuthService.signUp({ email, password, profile: "doctor" });
      const username = doctorData.user.getUsername();
      mutation.mutate({
        id: doctorData.userSub,
        name: name,
        surname: surname,
        category: category,
        email: username,
        city: city
      });
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <form className={style.form} onSubmit={onSubmit}>
      <input type="text" placeholder="category" {...register("category")} />
      <p>{errors.category?.message}</p>
      <input type="text" placeholder="name" {...register("name")} />
      <p>{errors.category?.message}</p>
      <input type="text" placeholder="surname" {...register("surname")} />
      <p>{errors.category?.message}</p>
      <input type="text" placeholder="city" {...register("city")} />
      <p>{errors.category?.message}</p>
      <input type="email" placeholder="email" {...register("email")} />
      <p>{errors.email?.message}</p>
      <input type="password" placeholder="password" {...register("password")} />
      <p>{errors.password?.message}</p>
      <button type="submit">Submit</button>
    </form>
  );
};
