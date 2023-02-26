import Button from "@mui/material/Button";
import style from "./HeaderButton.module.scss";

interface IProps {
  text: string;
}

export const HeaderButton = ({ text }: IProps) => {
  return (
    <Button className={style.button} color="primary" variant="outlined" sx={{ fontSize: { xs: "8px", sm: "15px" } }}>
      {text}
    </Button>
  );
};
