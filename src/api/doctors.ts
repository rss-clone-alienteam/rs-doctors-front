import { API, Storage } from "aws-amplify";

export interface IReview {
  id: string,
  date: string,
  namePatient: string
  review: string,
  rating: number | null
}

export interface IDoctor {
  aboutMe: string | null;
  address: string | null;
  category: string;
  city: string;
  education: string | null;
  email: string;
  experience: string | null;
  id: string;
  languages: string | null;
  nameDoctor: string;
  paymentMethod: string | null;
  phone: string | null;
  price: string | null;
  services: { name: string; price: string }[];
  surname: string;
  photo: string | null;
  reviews: Array<IReview> | null;
}

export const getDoctors = async (specialization: string, city: string) => {
  try {
    const data = await API.get("rs-doctors-back", "/doctors/get-doctors", {
      queryStringParameters: {
        category: specialization,
        city: city,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getDoctor = async (id?: string): Promise<IDoctor> => {
  const doctor: IDoctor = await API.get("rs-doctors-back", `/doctors/get-doctor/${id}`, {});
  return doctor;
};

export const getMap = async (address: string) => {
  const key = "c28eb37a-b0c8-44bd-b589-29629cb89fa2";
  // const key = "76383793-1243-485a-97a8-100f5e2d036f";
  // const key = "97861e46-e717-499b-903a-d604643b259f"; //втрой мой

  const data = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${key}&geocode=${address}&format=json`);
  const res = await data.json();

  const coords = res.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ").reverse();
  const newCoords = coords.map((item: string) => Number(item));
  return newCoords;
};

export async function getCords(data: IDoctor[]) {
  if (data == undefined) return;
  const newData = await Promise.all(
    data.map(async (doc: IDoctor) => {
      if (doc.address !== null) return await getMap(doc.address);
    }),
  );
  return newData;
}

export const updateDoctor = async (id?: string, body?: Partial<IDoctor>): Promise<IDoctor> => {
  const data = await API.patch("rs-doctors-back", `/doctors/update-doctor/${id}`, {
    body,
  });
  return data;
};

export const updateDoctorImage = async (file: File, id?: string) => {
  const list = await Storage.list(`doctors/${id}/photos/`, { level: "public" });
  if (list.results.length) {
    const item = list.results.find((result) => result.key?.includes("/avatar."));
    if (item?.key) {
      await Storage.remove(item.key, { level: "public" });
    }
  }
  const { key } = await Storage.put(`doctors/${id}/photos/avatar.${file.type.split("/")[1]}`, file, { level: "public", contentType: file.type });
  const photo = (await Storage.get(key, { level: "public" })).split("?")[0];
  await API.patch("rs-doctors-back", `/doctors/update-doctor/${id}`, {
    body: {
      photo,
    },
  });
};

export const deleteDoctor = async (
  id?: string,
): Promise<void> => {
  await API.del("rs-doctors-back", `/doctors/delete-doctor/${id}`, {});
};
