import style from "./HeaderDoctor.module.scss";
import { Alert, Avatar, Button, Grid, Link, Rating, Snackbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IDoctor, IReview } from "../../../api/doctors";
import { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../../Context/Context";

interface HeaderDoctorProp {
  data: IDoctor;
}

const HeaderDoctor = ({ data }: HeaderDoctorProp) => {
  const { isUserLogIn } = useContext(Context);
  const [openMessage, setOpenMessage] = useState(false);
  const navigate = useNavigate();
  const url = useLocation();

  const addReview = () => {
    if (!isUserLogIn) {
      window.sessionStorage.setItem("path", url.pathname);
      setOpenMessage(true);
      setTimeout(() => navigate("/auth/sign-in"), 2000);
    } else {
      navigate(`/review/${data?.id}`);
    }
  };

  return (
    <>
      <Box className={style.container}>
        <Grid container spacing={2} flexWrap={"nowrap"}>
          <Grid item>
            <Avatar alt="Avatar" src={data.photo || "../../assets/default-avatar.png"} sx={{ width: 150, height: 150 }} variant="rounded"></Avatar>
          </Grid>
          <Grid item container direction="column" spacing={0.6}>
            <Grid item>
              <Typography variant="body2" fontSize="18px">
                {data.nameDoctor + " " + data.surname}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary" fontSize="16px">
                {data.category}
              </Typography>
            </Grid>
            <Grid item container spacing={0.5}>
              <Grid item>
                <Rating
                  name="read-only"
                  precision={0.5}
                  value={
                    data.reviews
                      ? Number(data.reviews?.map((item: IReview) => item.rating).reduce((item, acc) => Number(item) + Number(acc), 0)) /
                      data.reviews.length
                      : 0
                  }
                  readOnly
                />
              </Grid>
              <Grid item>
                {data.reviews && (
                  <Link href="#" display={"flex"}>
                    {`${data.reviews.length} Review`}
                  </Link>
                )}
              </Grid>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={addReview} sx={{ marginTop: "10px" }}>
                Add Review
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={openMessage}
        autoHideDuration={2000}
        onClose={() => setOpenMessage(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenMessage(false)} severity="error">
          Please Sign In
        </Alert>
      </Snackbar>
    </>
  );
};

export { HeaderDoctor };
