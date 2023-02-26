import { Avatar, Button, Rating, TextField, Box, Typography, Container, Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { Context } from "../../Context/Context";
import { getDoctor, updateDoctor } from "../../api/doctors";
import { getPatient, IPatient } from "../../api/patients";
import style from "./ModalReview.module.scss";
import { IDoctor, IReview } from "../../api/doctors";
import { showToastMessage } from "../../utils/showToastMessage";

export const ModalReview = () => {
  const { id } = useParams();
  const { userID } = useContext(Context);
  const { control, register, formState: { errors }, handleSubmit } = useForm();

  const { data: doctor, isLoading: isLoadingDoctor } =
    useQuery<IDoctor>("doctor", () => getDoctor(id), {
      onError: () => {
        showToastMessage("Error during fetching data", "error");
      }
    }
  );

  const { data: patient } =
    useQuery<IPatient>("patient", () => getPatient(userID));

  const mutation = useMutation(
    (data: Partial<IDoctor>) => updateDoctor(id, data),
    {
      onSuccess: () => {
        showToastMessage("Review has been successfully added", "success");
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
        rating: Number(rating)
      };
      const data = doctor?.reviews ? [...doctor.reviews, newReview] : [newReview];
      mutation.mutate({
        reviews: data
      });
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
      </>
    )
  );
};
