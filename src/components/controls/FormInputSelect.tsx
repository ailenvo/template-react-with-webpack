import { Control, Controller, FieldErrors } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { IValue } from "../../models/common/models.type";

export interface FormInputSelectProps {
  // required by validate
  name: string;
  control: Control<any, object>;
  errors: FieldErrors<any>;
  // more field
  id?: string;
  list: IValue[];
  fullWidth?: boolean;
  label?: React.ReactNode;
  variant?: "filled" | "outlined" | "standard";
  size?: "small" | "medium";
  required?: boolean;
  onChange?: (value: any) => void;
}

export const FormInputSelect = ({
  name,
  label,
  control,
  errors,
  // more fields
  list = [],
  id = "input-select",
  fullWidth = true,
  variant = "outlined",
  size = "small",
  required,
  onChange,
}: FormInputSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <FormControl sx={{ width: "100%" }}>
          <InputLabel
            error={!!errors[name]}
            shrink
            sx={{ backgroundColor: "#FFF", paddingX: 1, marginLeft: -0.5 }}
            id={`${id}-label`}
            required={required}
          >
            {label}
          </InputLabel>
          <Select
            labelId={`${id}-label`}
            id={`${id}`}
            fullWidth={fullWidth}
            {...field}
            onChange={onChange ? onChange : field.onChange}
            value={field.value ?? ""}
            variant={variant}
            size={size}
            error={!!errors[name]}
          >
            {list.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {option.icon}
                {option.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>{errors[name]?.message}</FormHelperText>
        </FormControl>
      )}
      control={control}
    />
  );
};
