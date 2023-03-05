import { useFieldArray } from "react-hook-form";
import { Grid, Box, Typography, IconButton, List, ListItem, Divider, ListItemIcon } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { ControlledTextField } from "../../../components/ControlledTextField/ControlledTextField";

export const DoctorServices = () => {
  const { fields, append, remove } = useFieldArray({
    name: "services"
  });

  const onAppend = () => {
    append({ name: "", price: ""});
  };

  return (
    <>
      <Box mb={2} sx={{display: "flex"}}>
        <Typography mr={2} variant="h5">Provided services</Typography>
        <IconButton color="primary" aria-label="Add service" onClick={onAppend}>
          <AddIcon />
        </IconButton>
      </Box>
      <List>
        {fields.map((field, index) => (
          <ListItem key={field.id}>
            <ListItemIcon>
              <IconButton edge="end" aria-label="delete" onClick={() => remove(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemIcon>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <ControlledTextField fullWidth label="Services Sector" name={`services.${index}.name`} />
              </Grid>
              <Grid item xs={8}>
                <ControlledTextField fullWidth label="Price" name={`services.${index}.price`} />
              </Grid>
              <Grid item xs={8}>
                <Divider />
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </>
  );
};
