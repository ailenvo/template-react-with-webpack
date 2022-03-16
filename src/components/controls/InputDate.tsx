import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import AdapterMoment from "@mui/lab/AdapterMoment";
import { TextField } from "@mui/material";

type Props = {
  label?: string | Date;
  maxDate?: string | Date;
  minDate?: string | Date;
  clearable?: boolean;
  disablePast?: boolean;
  disableFuture?: boolean;
  value?: string | Date | null;
  onChange: (date: string | Date | null, keyboardInputValue?: string) => void;
};

export const InputDate = ({
  label,
  maxDate,
  minDate,
  clearable,
  disablePast,
  disableFuture,
  value,
  onChange,
}: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MobileDatePicker
        label={label}
        views={["year", "month"]}
        value={value}
        onChange={onChange}
        maxDate={maxDate}
        minDate={minDate}
        clearable={clearable}
        disablePast={disablePast}
        disableFuture={disableFuture}
        renderInput={(params) => (
          <TextField {...params} fullWidth variant="outlined" size="small" />
        )}
      />
    </LocalizationProvider>
  );
};
