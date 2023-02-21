import { Avatar, Button, Rating, TextField, Box, Typography, Container, Snackbar, Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery, useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Context } from "../../Context/Context";
import { getDoctor, updateDoctor } from "../../api/doctors";
import { getPatient, IPatient } from "../../api/patients";
import style from "./ModalReview.module.scss";
import { IDoctor, IReview } from "../../api/doctors";

type AlertType = {
  severity: "error" | "success";
  message: string;
};

export const ModalReview = () => {
  const [alert, setAlert] = useState<AlertType | null>(null);
  const { id } = useParams();
  const { userID, isUserLogIn } = useContext(Context);
  const { control, register, formState: { errors }, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { data: doctor, isLoading: isLoadingDoctor } =
    useQuery<IDoctor>("doctor", () => getDoctor(id), {
      onError: () => {
        setAlert({ severity: "error", message: "Error during fetching data" });
      }
    }
  );

  const { data: patient } =
    useQuery<IPatient>("patient", () => getPatient(userID));

  const mutation = useMutation(
    (data: Partial<IDoctor>) => updateDoctor(id, data),
    {
      onSuccess: () => {
        setAlert({ severity: "success", message: "Review has been successfully added" });
      },
    }
  );

  const onSubmit = handleSubmit(
    ({ rating, review }) => {
      const newReview: IReview  = {
        id: userID,
        date: new Date().toLocaleDateString(),
        namePatient: patient?.name || "",
        review: review,
        rating: rating
      };
      const data = doctor?.reviews ? [...doctor.reviews, newReview] : [newReview];
      isUserLogIn
      ? mutation.mutate({
          reviews: data
        })
      : navigate("/auth/sign-in");
    }
  );

  return (
    isLoadingDoctor ? (
      <CircularProgress size={120} sx={{ position: "fixed", top: "45vh", left: "45vw" }} />
    ) : (
      <>
        <Container className={style.modalContainer}>
          <Box className={style.modalHeader}>
            <Box>
              <Avatar
                alt="Avatar"
                src={doctor?.photo || "../../assets/default-avatar.png"}
                sx={{ width: 70, height: 70 }}
                variant="square"
              />
            </Box>
            <Box className={style.infoDoc}>
              <Box className={style.infoDocName}>{doctor?.nameDoctor + " " + doctor?.surname}</Box>
              <Box className={style.infoDocCategory}>{doctor?.category}</Box>
            </Box>
          </Box>

          <Box component="form" onSubmit={onSubmit} className={style.sectionInput}>
            <Controller
              name="rating"
              control={control}
              rules={{ required: true }}
              defaultValue={5}
              render={(props) =>
                <Rating
                  name="rating"
                  onChange={props.field.onChange}
                  value={Number(props.field.value)}
                  size="large"
                  precision={0.5}
                />
              }
            />
            {errors.rating && <Alert sx={{margin: "10px 0"}} severity="warning">Please rate the doctor</Alert>}
            <Typography sx={{color: "#3ab2e4"}} my={1}>Leave a review:</Typography>
            <TextField
              variant="outlined"
              fullWidth
              label="Review"
              multiline rows={4}
              {...register("review")}
            />
            <Button
              sx={{ marginTop: "25px", width: "100%" }}
              className={style.inputBtn}
              variant="contained"
              type="submit"
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Box>
        </Container>
        <Snackbar
          open={!!alert}
          autoHideDuration={3000}
          onClose={() => setAlert(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={() => setAlert(null)} severity={alert?.severity || "success"}>{alert?.message}</Alert>
        </Snackbar>
      </>
    )
  );
};
