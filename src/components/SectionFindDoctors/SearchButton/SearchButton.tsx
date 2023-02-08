import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { FC } from "react";

interface IProps {
  onClick: () => void
}

export const SearchButton: FC<IProps> = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="success"
      size="large"
      endIcon={<SendIcon />}
      onClick={onClick}
    >
      Search
    </Button>
  );
};
