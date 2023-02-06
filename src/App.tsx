import { Routes, Route } from "react-router-dom";
import { About } from "./pages/About/About";
import { Home } from "./pages/Home/Home";
import { Notfound } from "./pages/Notfound/Notfound";
import { Layout } from "./components/Layout/Layout";
import { SignUpPatient } from "./pages/auth/SignUp/SignUpPatient";
import { SignUpDoctor } from "./pages/auth/SignUp/SignUpDoctor";
import { SignIn } from "./pages/auth/SignIn/SignIn";
import { SignUpConfirmation } from "./pages/auth/SignUpConfirmation/SignUpConfirmation";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="auth">
            <Route path="sign-up-doctor" element={<SignUpDoctor />}></Route>
            <Route path="sign-up-patient" element={<SignUpPatient />}></Route>
            <Route path="sign-in" element={<SignIn />}></Route>
            <Route path="sign-up-confirmation" element={<SignUpConfirmation />}></Route>
          </Route>
          <Route path="*" element={<Notfound />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
