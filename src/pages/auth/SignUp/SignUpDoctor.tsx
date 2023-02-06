import style from "./SignUpDoctor.module.scss";
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

const schema = object({
  category: string().required(),
  name: string().required(),
  surname: string().required(),
  city: string().required(),
  email: string().email().required(),
  password: string().required().min(8),
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

  const onSubmit = handleSubmit(async ({ email, password, name, surname, city, category }) => {
    try {
      const doctorData = await AuthService.signUp({ email, password, profile: "doctor" });
      const username = doctorData.user.getUsername();
      await API.post("rs-doctors-back", "/doctors/add-doctor", {
        body: {
          id: doctorData.userSub,
          name: name,
          surname: surname,
          category: category,
          email: username,
          city: city
        }
      });
      navigate(`/auth/sign-up-confirmation?email=${username}`)
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
