import { Avatar, Button, Rating, TextField } from "@mui/material";
import { useQuery } from "react-query";
import { getDoctor } from "../../api/doctors";
import style from "./ModalReview.module.scss";

export const ModalReview = () => {
  const url = window.location.href;
  const id = url.slice(url.lastIndexOf("/") + 1);

  const { data } = useQuery("doctor", () => getDoctor(id));

  return (
    <div className={style.modalContainer}>
      <section className={style.modalHeader}>
        <div>
          <Avatar
            alt="Avatar"
            src="https://icdn.lenta.ru/images/2022/10/31/11/20221031114742010/square_1024_webp_8f466724f273b97b62416bb38f7c4ab3.webp"
            sx={{ width: 70, height: 70 }}
            variant="square"
          />
        </div>
        <div className={style.infoDoc}>
          <div className={style.infoDocName}>{data.nameDoctor + " " + data.surname}</div>
          <div className={style.infoDocCategory}>{data.category}</div>
        </div>
      </section>

      <section className={style.sectionInput}>
        <div className={style.rating}>
          <div>Please rate:</div>
          <Rating size={"large"} className={style.ratingStar} name="half-rating" defaultValue={0} precision={0.5} />
        </div>

        <div className={style.form}>
          <div className={style.inputText}>Leave a review:</div>
          <TextField id="outlined-multiline-static" label="Review" multiline rows={4} />
          <Button sx={{ marginTop: "25px" }} className={style.inputBtn} variant="contained">
            Submit
          </Button>
        </div>
      </section>
    </div>
  );
};
