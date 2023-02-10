import { API } from "aws-amplify";

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

export const getDoctor = async (id: string) => {
  try {
    const data = await API.get("rs-doctors-back", "/doctors/get-doctor", {
      queryStringParameters: {
        id: id,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
