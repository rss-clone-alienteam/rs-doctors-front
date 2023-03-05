import { Auth } from "aws-amplify";

type Profile = "doctor" | "patient";

interface UserAuthData {
  email: string;
  password: string;
  profile: Profile;
}

interface UserConfirmData {
  email: string;
  code: string;
}

interface UserData {
  email: string;
  password: string;
}

interface UserEmailData {
  email: string;
}

interface UserNewPassData {
  email: string;
  code: string;
  newPassword: string;
}

export class AuthService {
  static async signUp({ email, password, profile }: UserAuthData) {
    const data = await Auth.signUp({
      username: email,
      password,
      attributes: {
        profile,
      },
      autoSignIn: {
        enabled: true,
      },
    });
    return data;
  }

  static async confirmSignUp({ email, code }: UserConfirmData) {
    await Auth.confirmSignUp(email, code);
  }

  static async resendSignUp({ email }: UserEmailData) {
    await Auth.resendSignUp(email);
  }

  static async getUser() {
    return Auth.currentUserInfo();
  }

  static async signIn({ email, password }: UserData) {
    return await Auth.signIn(email, password);
  }

  static async requestRecoveryPassword({ email }: UserEmailData) {
    await Auth.forgotPassword(email);
  }

  static async changePasswordSubmit({
    email,
    code,
    newPassword,
  }: UserNewPassData) {
    await Auth.forgotPasswordSubmit(email, code, newPassword);
  }

  static async signOut() {
    return await Auth.signOut();
  }
}
