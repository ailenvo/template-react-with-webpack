import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { IValue } from "../../models/common/models.type";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";

type Props = {
  list: IValue[];
  id?: string;
  fullWidth?: boolean;
  label?: React.ReactNode;
  required?: boolean;
  value?: any;
  onChange: (event: any) => void;
  variant?: "filled" | "outlined" | "standard";
  size?: "small" | "medium";
  errorField?: any;
  multiple?: boolean;
  placeholder?: string;
};

export default function InputSelect({
  list = [],
  id = "input-select",
  fullWidth = true,
  label,
  required,
  value,
  onChange,
  variant = "outlined",
  size = "small",
  errorField,
  multiple,
  placeholder,
}: Props) {
  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel
        error={errorField ? true : false}
        required={required}
        shrink
        sx={{ backgroundColor: "#FFF", paddingX: 1, marginLeft: -0.5 }}
        id={`${id}-label`}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`${id}-label`}
        id={`${id}`}
        fullWidth={fullWidth}
        value={value}
        onChange={onChange}
        variant={variant}
        size={size}
        error={errorField ? true : false}
        multiple={multiple}
        renderValue={(selected: any) => {
          if (typeof selected === "string" || typeof selected === "number") {
            return (
              list.find((item) => item.code === selected)?.name ?? placeholder
            );
          }

          if (typeof selected === "object" && selected.length) {
            return placeholder && (selected as string[]).includes(placeholder)
              ? placeholder
              : selected.join(", ");
          }

          return placeholder;
        }}
      >
        {placeholder && <MenuItem disabled>{placeholder}</MenuItem>}
        {list.map((option) => (
          <MenuItem key={option.code} value={option.code}>
            {option.icon}
            {option.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error>{errorField?.message}</FormHelperText>
    </FormControl>
  );
}
