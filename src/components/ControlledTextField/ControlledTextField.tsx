import { useFormContext, Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type ControlledTextFieldProps = {
  name: string;
} & TextFieldProps;

export const ControlledTextField = ({ name, ...restProps }: ControlledTextFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=''
      render={({ field }) => (
        <TextField
          {...field}
          {...restProps}
          value={field.value || ""}
          error={!!errors[name]}
          helperText={
            errors[name] ? (errors[name]?.message as unknown as string) : ""
          }
        />
      )}
    />
  );
};
