import { API } from "aws-amplify";

export interface IDoctor {
  aboutMe: string;
  address: string;
  category: string;
  city: string;
  education: string;
  email: string;
  experience: string;
  id: string;
  languages: string;
  name: string;
  paymentMethod: string;
  phone: string;
  price: string;
  servicesSector: string;
  surname: string;
}

export const getDoctors = async (specialization: string, city: string) => {
  try {
    const data = await API.get("rs-doctors-back", "/doctors/get-doctors", {
      queryStringParameters: {
        category: specialization,
        city: city,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getDoctor = async (id?: string): Promise<IDoctor> => {
  const data = API.get("rs-doctors-back", `/doctors/get-doctor/${id}`, {});
  console.log(data);
  return data;
};
