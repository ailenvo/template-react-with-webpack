import { Checkbox, FormControlLabel, Typography } from "@mui/material";

type Props = {
  label: string;
  defaultChecked?: boolean;
  checked?: boolean;
  name?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
};

export default function InputCheckBox({
  label,
  defaultChecked,
  name,
  checked,
  onChange,
}: Props) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          onChange={onChange}
          defaultChecked={defaultChecked}
          name={name}
          checked={checked}
        />
      }
      label={
        <Typography color="textPrimary" variant="body2">
          {label}
        </Typography>
      }
    />
  );
}
