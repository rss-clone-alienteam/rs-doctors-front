import Button from "@mui/joy/Button";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

export const SearchButton = () => {
  return (
    <Button
      variant="solid"
      endDecorator={<KeyboardArrowRight />}
      color="success"
    >
      Search
    </Button>
  );
};
