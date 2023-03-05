import { Avatar, Box, Card, CardContent, CardHeader, Rating, Typography } from "@mui/material";
import { IReview } from "../../../api/doctors";

interface ReviewCardProp {
  review: IReview;
}

const ReviewCard = ({ review }: ReviewCardProp) => {
  const getRandomColor = () => "#" + (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase();

  return (
    <Card sx={{ boxShadow: "1px 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 1px 1px 9px 2px rgb(0 0 0 / 12%)" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: getRandomColor(), width: 54, height: 54 }} aria-label="recipe">
            {review.namePatient[0].toUpperCase()}
          </Avatar>
        }
        title={
          <>
            <Box fontSize={"18px"}>{`${review.namePatient}`}</Box>
            {review.rating && <Rating name="read-only" value={Number(review.rating)} precision={0.5} readOnly />}
          </>
        }
        subheader={review.date}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {review.review}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { ReviewCard };
