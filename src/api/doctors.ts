import { API, Storage } from "aws-amplify";

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
  servicesSector: string | null;
  surname: string;
  photo: string | null;
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
  const doctor: IDoctor = await API.get("rs-doctors-back", `/doctors/get-doctor/${id}`, {});
  return doctor;
};

export const updateDoctor = async (id?: string, body?: Partial<IDoctor>): Promise<IDoctor> => {
  const data = await API.patch("rs-doctors-back", `/doctors/update-doctor/${id}`, {
    body
  });
  return data;
};

export const updateDoctorImage = async (file: File, id?: string) => {
  const list = await Storage.list(`doctors/${id}/photos/`, { level: "public" });
  if (list.results.length) {
    const item = list.results.find(result => result.key?.includes("/avatar."));
    if (item?.key) {
      await Storage.remove(item.key, { level: "public" });
    }
  }
  const { key } = await Storage.put(`doctors/${id}/photos/avatar.${file.type.split("/")[1]}`, file, { level: "public", contentType: file.type });
  const photo = (await Storage.get(key, { level: "public" })).split("?")[0];
  await API.patch("rs-doctors-back", `/doctors/update-doctor/${id}`, {
    body: {
      photo
    }
  });
};
