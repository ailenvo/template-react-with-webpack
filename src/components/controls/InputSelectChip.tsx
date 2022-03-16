import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { FormHelperText } from "@mui/material";

type Props = {
  list: string[];
  multiple?: boolean;
  fullWidth?: boolean;
  label?: React.ReactNode;
  required?: boolean;
  id?: string;
  value: string[];
  onChange: (value: any) => void;
  variant?: "filled" | "outlined" | "standard";
  errorField?: any;
  register?: any;
};

function getStyles(name: any, personName: any, theme: any) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function InputSelectChip({
  list = [],
  multiple,
  fullWidth = true,
  label,
  required,
  id = "multiple-select-chip",
  value = [],
  onChange,
  variant = "outlined",
  errorField,
  register,
}: Props) {
  const theme = useTheme();

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    const result = typeof value === "string" ? value.split(",") : value;
    onChange(result);
  };

  return (
    <div>
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
          {...register}
          multiple={multiple}
          value={value}
          onChange={handleChange}
          renderValue={(selected: string[]) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value: string) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          size="small"
          error={errorField ? true : false}
          variant={variant}
        >
          {list.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, value, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error>{errorField?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}
