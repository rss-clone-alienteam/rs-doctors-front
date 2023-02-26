import { useEffect } from "react";
import { useParams } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import { useQuery, useMutation, useQueryClient  } from "react-query";
import { IDoctor, updateDoctor, getDoctor } from "../../../api/doctors";
import { filterData, pick } from "../../../utils/object";
import { showToastMessage } from "../../../utils/showToastMessage";
import { ControlledTextField } from "../../../components/ControlledTextField/ControlledTextField";
import { DoctorServices } from "./DoctorServices";
import { Grid, Box, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const EditDoctor = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: doctor, isLoading: isLoadingDoctor } =
    useQuery<IDoctor, Error>(["doctor", id], () => getDoctor(id), {
      onError: () => {
        showToastMessage("Error during fetching data", "error");
      }
    });

  const form = useForm({
    defaultValues: filterData(doctor || {})
  });

  useEffect(() => {
    if (doctor) {
      form.reset(filterData(doctor || {}));
    }
  }, [form, doctor]);

  const mutation = useMutation(
    (data: Partial<IDoctor>) => updateDoctor(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("doctor");
        showToastMessage("Doctor data has been successfully updated", "success");
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
      "services",
      "paymentMethod",
      "aboutMe",
      "languages",
    ]));
  });

  return (
    <Box pt={2}>
      {isLoadingDoctor ? (
        <CircularProgress size={120} sx={{ position: "fixed", top: "45vh", left: "45vw" }} />
      ) : (
        <FormProvider {...form}>
          <Box component='form' noValidate autoComplete='off' onSubmit={onSubmit}>
            <Grid container spacing={2} mb={2}>
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
                <DoctorServices />
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
            <Button type="submit" sx={{marginBottom: "20px"}}>Update</Button>
          </Box>
        </FormProvider>
      )}
    </Box>
  );
};
