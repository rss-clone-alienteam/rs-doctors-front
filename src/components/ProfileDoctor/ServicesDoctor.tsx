import { Paper, Stack, styled } from "@mui/material";

const ServicesDoctor = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    // borderTop: "1px solid black",
    // borderRadius: "0",
    // boxShadow: "none",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Stack spacing={2}>
      <Item>Gynecological consultation</Item>
      <Item>Pregnancy ultrasound</Item>
    </Stack>
  );
};

export { ServicesDoctor };
