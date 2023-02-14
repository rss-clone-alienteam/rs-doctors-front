import { Button } from "@mui/material";
import { Box } from "@mui/joy";
import { AuthService } from "../../../services/AuthService";
import { useState } from "react";
import { useNavigate } from "react-router";

export const ResetPasswordModal = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(false);
  const [isEmailExist, setEmailExist] = useState(false);

  const passRecovery = async () => {
    try {
      await AuthService.requestRecoveryPassword({ email });
      setError(false);
      setEmailExist(true);
    } catch {
      setError(true);
      setEmailExist(false);
    }
  };

  const submitNewPass = async () => {
    try {
      await AuthService.changePasswordSubmit({ email, code, newPassword });
      navigate("/auth/sign-in");
    } catch {
      console.log("Something went wrong!");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={passRecovery}>Change password</Button>
      {error && (
        <Box component="span" sx={{ color: "red" }}>
          We do not have this e-mail
        </Box>
      )}
      {isEmailExist && (
        <>
          <Box>
            <input
              type="text"
              placeholder="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <input
              type="password"
              placeholder="new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Box>
          <Button onClick={submitNewPass}>Submit</Button>
        </>
      )}
    </Box>
  );
};
