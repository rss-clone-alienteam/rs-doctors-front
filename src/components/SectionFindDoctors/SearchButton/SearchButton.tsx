import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export const SearchButton = () => {
  return (
    <Button
      variant="contained"
      color="success"
      size="large"
      endIcon={<SendIcon />}
    >
      Search
    </Button>
  );
};
