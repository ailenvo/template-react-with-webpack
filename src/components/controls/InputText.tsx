import * as React from "react";
import { InputLabelProps, TextField } from "@mui/material";

type Props = {
  id?: string;
  name?: string;
  type?: React.InputHTMLAttributes<unknown>["type"];
  fullWidth?: boolean;
  label?: React.ReactNode;
  required?: boolean;
  value?: unknown;
  onChange: (event: any) => void;
  variant?: "filled" | "outlined" | "standard";
  size?: "small" | "medium";
  InputLabelProps?: Partial<InputLabelProps> | undefined;
  rows?: string | number;
  multiline?: boolean;
  autoComplete?: string;
  errorField?: any;
  onBlur?: (event: any) => void;
};

export default function InputText({
  id,
  name,
  type,
  fullWidth = true,
  label,
  required,
  value = "",
  onChange,
  variant = "outlined",
  size = "small",
  InputLabelProps = {
    shrink: true,
  },
  rows,
  multiline,
  autoComplete = "off",
  errorField,
  onBlur,
}: Props) {
  return (
    <TextField
      id={id}
      name={name}
      type={type}
      fullWidth={fullWidth}
      label={label}
      required={required}
      value={(value !== undefined && value !== null && value) || ""}
      onChange={onChange}
      onBlur={onBlur}
      variant={variant}
      size={size}
      InputLabelProps={InputLabelProps}
      rows={rows}
      multiline={multiline}
      autoComplete={autoComplete}
      error={errorField ? true : false}
      helperText={errorField?.message}
    />
  );
}
