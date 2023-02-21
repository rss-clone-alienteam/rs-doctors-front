import { Box, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useContext, useState } from "react";
import { HeaderDoctor } from "../../components/ProfileDoctor/HeaderDoctor";
import { InfoDoctor } from "../../components/ProfileDoctor/InfoDoctor";
import { getDoctor } from "../../api/doctors";
import { useQuery } from "react-query";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../Context/Context";

const DoctorProfile = () => {
  const { isUserLogIn } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();
  const [openMessage, setOpenMessage] = useState(false);

  const { isLoading, data } = useQuery("doctor", () => getDoctor(id));

  console.log(data);

  const addReview = () => {
    if (!isUserLogIn) {
      setOpenMessage(true);
      setTimeout(() => navigate("/auth/sign-in"), 2000);
    } else {
      navigate(`/review/${data?.id}`);
    }
  };

  return (
    <>
      {data && (
        <>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <HeaderDoctor data={data} />
            <InfoDoctor data={data} />
            <Button variant="contained" onClick={addReview}>
              Add Review
            </Button>
          </Box>
          <Snackbar
            open={openMessage}
            autoHideDuration={2000}
            onClose={() => setOpenMessage(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={() => setOpenMessage(false)} severity="error">Please Sign In</Alert>
          </Snackbar>
        </>
      )}
      {isLoading && <CircularProgress size={120} sx={{ position: "fixed", top: "45vh", left: "45vw" }} />}
    </>
  );
};

export { DoctorProfile };
