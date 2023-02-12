import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { API } from "aws-amplify";
import { IDoctor } from "../../api/doctors";
import { filterData, pick } from "../../utils/object";
import { Grid, Box, Button } from "@mui/material";
import { ControlledTextField } from "../../components/ControlledTextField/ControlledTextField";

type EditDoctorModalProps = {
  data?: IDoctor;
  id?: string;
}

export const EditDoctorModal = ({ data, id }: EditDoctorModalProps) => {
  const form = useForm({
    defaultValues: filterData(data || {})
  });

  useEffect(() => {
    if (data) {
      form.reset(filterData(data));
    }
  }, [form, data]);

  const onSubmit = form.handleSubmit(async (formData) => {
    try {
      await API.patch("rs-doctors-back", `/doctors/update-doctor/${id}`, {
        body: pick(formData, [
          "nameDoctor",
          "surname",
          "city",
          "address",
          "phone",
          "education",
          "experience",
          "servicesSector",
          "price",
          "paymentMethod",
          "aboutMe",
          "languages",
        ]),
      });
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <FormProvider {...form}>
      <Box component='form' noValidate autoComplete='off' onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ControlledTextField fullWidth label="Name" name="nameDoctor" />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField fullWidth label="Surname" name="surname" />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField fullWidth label="City" name="city" />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField fullWidth label="Address" name="address" />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField fullWidth label="Phone" name="phone" />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField fullWidth label="Education" name="education" />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField fullWidth label="Experience" name="experience" />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField fullWidth label="Services Sector" name="servicesSector" />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField fullWidth label="Price" name="price" />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField fullWidth label="Payment Method" name="paymentMethod" />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField fullWidth label="About Me" multiline name="aboutMe" />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField fullWidth label="Languages" name="languages" />
          </Grid>
        </Grid>
        <Button type="submit">Update</Button>
      </Box>
    </FormProvider>
  );
};
