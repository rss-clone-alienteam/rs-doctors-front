import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Notfound } from "./pages/Notfound/Notfound";
import { Layout } from "./components/Layout/Layout";
import { SignUpPatient } from "./pages/auth/SignUp/SignUpPatient";
import { SignUpDoctor } from "./pages/auth/SignUp/SignUpDoctor";
import { SignIn } from "./pages/auth/SignIn/SignIn";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./themes/appTheme";
import { QueryClient, QueryClientProvider } from "react-query";
import { AskDoctor } from "./pages/AskDoctor/AskDoctor";
import { SignUpConfirmation } from "./pages/auth/SignUpConfirmation/SignUpConfirmation";
import { FindDoctors } from "./pages/FindDoctors/FindDoctors";
import { DoctorProfile } from "./pages/DoctorProfile/DoctorProfile";
import { PatientAccount } from "./pages/PatientAccount/PatientAccount";
import { DoctorAccount } from "./pages/DoctorAccount/DoctorAccount";
import { ModalReview } from "./pages/ModalReview/ModalReview";
import { Context } from "./Context/Context";
import { useEffect, useState } from "react";
import { getUserInfo } from "./utils/getUserInfo";

function App() {
  const [isUserLogIn, setIsUserLogIn] = useState(false);
  const [userID, setUserID] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [profile, setProfile] = useState("");

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  const checkAuth = async () => {
    const { isLogIn, userID, mail, profile } = await getUserInfo();
    setIsUserLogIn(isLogIn);
    setUserID(userID);
    setUserEmail(mail);
    setProfile(profile);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Context.Provider
      value={{
        isUserLogIn,
        setIsUserLogIn,
        userID,
        setUserID,
        userEmail,
        setUserEmail,
        profile,
        setProfile
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={appTheme}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />}></Route>
              <Route path="ask-doctor" element={<AskDoctor />}></Route>
              <Route path="doctors" element={<FindDoctors />}></Route>
              <Route path="doctor/:id" element={<DoctorProfile />}></Route>
              <Route path="review/:id" element={<ModalReview />}></Route>
              <Route path="auth">
                <Route path="sign-up-doctor" element={<SignUpDoctor />}></Route>
                <Route path="sign-up-patient" element={<SignUpPatient />}></Route>
                <Route path="sign-in" element={<SignIn />}></Route>
                <Route path="sign-up-confirmation" element={<SignUpConfirmation />}></Route>
              </Route>
              <Route path="patient-account/:id" element={<PatientAccount />}></Route>
              <Route path="doctor-account/:id" element={<DoctorAccount />}></Route>
              <Route path="*" element={<Notfound />}></Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </Context.Provider>
  );
}

export default App;
