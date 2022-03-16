import { Control, Controller, FieldErrors } from "react-hook-form";
import {
  InputBaseProps,
  InputLabelProps,
  InputProps,
  TextField,
} from "@mui/material";

export interface FormInputTextProps {
  // required by validate
  name: string;
  control: Control<any, object>;
  errors: FieldErrors<any>;
  // more field
  type?: React.InputHTMLAttributes<unknown>["type"];
  fullWidth?: boolean;
  label?: React.ReactNode;
  variant?: "filled" | "outlined" | "standard";
  size?: "small" | "medium";
  InputLabelProps?: Partial<InputLabelProps> | undefined;
  rows?: string | number;
  multiline?: boolean;
  autoComplete?: string;
  required?: boolean;
  onBlur?: InputBaseProps["onBlur"];
  InputProps?: Partial<InputProps>;
  maxRows?: string | number;
  minRows?: string | number;
  disabled?: boolean;
}

export const FormInputText = ({
  name,
  label,
  control,
  errors,
  // more fields
  type,
  fullWidth = true,
  variant = "outlined",
  size = "small",
  InputLabelProps = {
    shrink: true,
  },
  rows,
  multiline,
  autoComplete = "off",
  required,
  onBlur,
  InputProps,
  maxRows,
  minRows,
  disabled,
}: FormInputTextProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <TextField
          id={name}
          helperText={errors[name] ? errors[name].message : null}
          label={label}
          error={!!errors[name]}
          required={required}
          {...field}
          type={type}
          fullWidth={fullWidth}
          variant={variant}
          size={size}
          InputLabelProps={InputLabelProps}
          rows={rows}
          multiline={multiline}
          autoComplete={autoComplete}
          onBlur={onBlur}
          InputProps={InputProps}
          maxRows={maxRows}
          minRows={minRows}
          disabled={disabled}
          value={field.value || ""}
        />
      )}
      control={control}
    />
  );
};
