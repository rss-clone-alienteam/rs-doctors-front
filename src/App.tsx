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

function App() {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider theme={appTheme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="ask-doctor" element={<AskDoctor />}></Route>
          <Route path="auth">
            <Route
              path="sign-up-doctor"
              element={
                <QueryClientProvider client={queryClient}>
                  <SignUpDoctor />
                </QueryClientProvider>
              }
            ></Route>
            <Route path="sign-up-patient" element={<SignUpPatient />}></Route>
            <Route path="sign-in" element={<SignIn />}></Route>
            <Route
              path="sign-up-confirmation"
              element={
                <QueryClientProvider client={queryClient}>
                  <SignUpConfirmation />
                </QueryClientProvider>
              }
            ></Route>
          </Route>
          <Route path="*" element={<Notfound />}></Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
