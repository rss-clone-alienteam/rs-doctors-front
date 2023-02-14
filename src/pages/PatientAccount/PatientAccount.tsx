import { Auth } from "aws-amplify";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPatient } from "../../api/patients";
import { Context } from "../../Context/ContextProvider";
import { AuthService } from "../../services/AuthService";
import style from "./PatientAccount.module.scss";

export const PatientAccount = () => {
  const { id } = useParams();
  const { data } = useQuery("patient", () => getPatient(id));

  const tokens = useContext(Context);

  localStorage.setItem("tokens", JSON.stringify(tokens));

  const signedUser = async () => {
    console.log(await Auth.currentAuthenticatedUser());
    console.log(await AuthService.getUser());
  };
  signedUser();

  // console.log(Auth.currentAuthenticatedUser());

  return (
    <div>
      <h1 className={style.h1}>{data?.email}</h1>
    </div>
  );
};
