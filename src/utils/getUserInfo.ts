import { Auth } from "aws-amplify";

const userInfo = {
  userID: "",
  isLogIn: false,
  mail: "",
  profile: "",
};

export const getUserInfo = async () => {
  try {
    const currentUser = await Auth.currentAuthenticatedUser();
    console.log("try", currentUser);
    return {
      userID: currentUser.attributes.sub,
      isLogIn: true,
      mail: currentUser.attributes.email,
      profile: currentUser.attributes.profile,
    };
  } catch (err) {
    return userInfo;
  }
};
