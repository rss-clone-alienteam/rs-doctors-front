import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQueryClient  } from "react-query";
import { IDoctor, updateDoctor } from "../../api/doctors";
import { filterData, pick } from "../../utils/object";
import { Grid, Box, Button } from "@mui/material";
import { ControlledTextField } from "../../components/ControlledTextField/ControlledTextField";
import { AlertType } from "./types";

type EditDoctorModalProps = {
  data?: IDoctor;
  id?: string;
  onClose: () => void;
  setAlert: (alert: AlertType) => void;
}

export const EditDoctorModal = ({ data, id, setAlert, onClose }: EditDoctorModalProps) => {
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: filterData(data || {})
  });

  useEffect(() => {
    if (data) {
      form.reset(filterData(data));
    }
  }, [form, data]);

  const mutation = useMutation(
    (data: Partial<IDoctor>) => updateDoctor(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("doctor");
        setAlert({ severity: "success", message: "Doctor's data has been successfully updated" });
        onClose();
      },
    }
  );

  const onSubmit = form.handleSubmit(async (formData) => {
    mutation.mutate(pick(formData, [
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
    ]));
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
