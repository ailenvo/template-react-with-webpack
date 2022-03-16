import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import AdapterMoment from "@mui/lab/AdapterMoment";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { DATE_FORMAT } from "../../common/constants/value.constant";
import { FormInputTextProps } from "./FormInputText";

export interface FormInputDateProps extends FormInputTextProps {
  maxDate?: string | Date;
  minDate?: string | Date;
  clearable?: boolean;
  disablePast?: boolean;
  disableFuture?: boolean;
}

export const FormInputDate = ({
  errors,
  name,
  control,
  label,
  maxDate,
  minDate,
  clearable,
  disablePast,
  disableFuture,
}: FormInputDateProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MobileDatePicker
            label={label}
            inputFormat={DATE_FORMAT}
            maxDate={maxDate}
            minDate={minDate}
            {...field}
            clearable={clearable}
            disablePast={disablePast}
            disableFuture={disableFuture}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                variant="outlined"
                size="small"
                helperText={errors[name] ? errors[name].message : null}
                error={!!errors[name]}
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  );
};
