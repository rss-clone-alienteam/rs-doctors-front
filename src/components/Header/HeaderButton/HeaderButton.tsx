import Button from "@mui/material/Button";

interface IProps {
  text: string;
}

export const HeaderButton = ({ text }: IProps) => {
  return (
    <Button color="primary" variant="outlined" sx={{ ml: " auto" }}>
      {text}
    </Button>
  );
};
