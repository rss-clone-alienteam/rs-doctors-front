import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { API } from "aws-amplify";
import axios from "axios";

const click = async () => {
  const url = async () => {
    return API.endpoint("rs-doctors-back").then(
      (res) => res + "/doctors/get-doctors/"
    );
  };

  return axios.get(await url());
};

export const SearchButton = () => {
  return (
    <Button
      variant="contained"
      color="success"
      size="large"
      endIcon={<SendIcon />}
      onClick={click}
    >
      Search
    </Button>
  );
};
