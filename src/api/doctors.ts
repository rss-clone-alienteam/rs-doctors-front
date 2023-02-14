import axios from "axios";
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

export const getMap = async (address: string) => {
  const key = "c28eb37a-b0c8-44bd-b589-29629cb89fa2";
  // const key = "76383793-1243-485a-97a8-100f5e2d036f";
  const data = await axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=${key}&geocode=${address}&format=json`);
  const cords = data.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ").reverse();
  return cords;
};
