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
  } catch (error) {
    console.log(error);
  }
};
