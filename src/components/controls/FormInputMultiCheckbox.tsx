import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { FormInputSelectProps } from "./FormInputSelect";

export interface FormInputCheckboxProps extends FormInputSelectProps {}

export const FormInputMultiCheckbox: React.FC<FormInputCheckboxProps> = ({
  name,
  label,
  control,
  errors,
  // more fields
  list = [],
  id = "input-select",
  variant = "outlined",
  size = "small",
}) => {
  const [selected, setSelected] = useState<string | number>("");

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <FormControl size={size} variant={variant}>
          <FormLabel id={`${id}-label`} component="legend">
            {label}
          </FormLabel>
          <div>
            {list.map((option) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      size={size}
                      checked={selected === option.code}
                      onChange={(e, checked) => {
                        let newValue: string | number = "";
                        if (checked) newValue = option.code;
                        setSelected(newValue);
                        field.onChange(newValue);
                      }}
                    />
                  }
                  label={option.name}
                  key={option.code}
                />
              );
            })}
          </div>
          <FormHelperText error>{errors[name]?.message}</FormHelperText>
        </FormControl>
      )}
      control={control}
    />
  );
};
