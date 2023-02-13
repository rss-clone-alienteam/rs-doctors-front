import { Avatar, Grid, Link, Rating } from "@mui/material";
import { Box } from "@mui/system";
import { IDoctor } from "../PageDoctors/CardDoctor";

interface HeaderDoctorProp {
  data: IDoctor;
}

const HeaderDoctor = ({ data }: HeaderDoctorProp) => {
  return (
    <Box color={"black"}>
      <Grid container>
        <Grid item>
          <Avatar
            alt="Avatar"
            src="https://icdn.lenta.ru/images/2022/10/31/11/20221031114742010/square_1024_webp_8f466724f273b97b62416bb38f7c4ab3.webp"
            sx={{ width: 150, height: 150 }}
            variant="square"
          ></Avatar>
        </Grid>
        <Grid item>
          <Box>
            <Grid container direction="column">
              <Grid item>
                <Box component={"h1"}>{data.nameDoctor + " " + data.surname} </Box>
              </Grid>
              <Grid item>
                <Box component={"h2"}>{data.category}</Box>
              </Grid>
              <Grid item display={"flex"}>
                <Rating name="read-only" value={5} readOnly />
                <Link href="#" display={"flex"}>
                  <Box component={"span"}>Amount</Box>
                  <Box component={"span"}>Review</Box>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export { HeaderDoctor };
