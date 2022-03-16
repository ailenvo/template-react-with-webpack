import React, { useEffect } from "react";
import Chip from "@mui/material/Chip";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Downshift from "downshift";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
}));

type Props = {
  selectedTags: (value: string[]) => void;
  tags: string[];
  id?: string;
  name?: string;
  placeholder: string;
  label: string;
  autoComplete?: string;
  required?: boolean;
  type?: string;
  errMessage?: string;
};

export default function TagsInput({
  selectedTags,
  tags = [],
  id,
  name,
  placeholder,
  label,
  autoComplete,
  required,
  type = "text",
  errMessage,
}: Props) {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState<string>("");
  const [selectedItem, setSelectedItem] = React.useState<string[]>([]);
  useEffect(() => {
    setSelectedItem(tags);
  }, [tags]);

  function handleKeyDown(event: any) {
    if (event.key === "Enter") {
      const newSelectedItem = [...selectedItem];
      const duplicatedValues = newSelectedItem.indexOf(
        event.target.value.trim()
      );

      if (duplicatedValues !== -1) {
        setInputValue("");
        return;
      }
      if (!event.target.value.replace(/\s/g, "").length) return;

      newSelectedItem.push(event.target.value.trim());
      setSelectedItem(newSelectedItem);
      selectedTags(newSelectedItem);
      setInputValue("");
    }
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === "Backspace"
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
      selectedTags(selectedItem.slice(0, selectedItem.length - 1));
    }
  }
  function handleChange(item: any) {
    let newSelectedItem = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue("");
    setSelectedItem(newSelectedItem);
  }

  const handleDelete = (item: string) => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
    selectedTags(newSelectedItem);
  };

  function handleInputChange(event: any) {
    setInputValue(event.target.value);
  }
  return (
    <React.Fragment>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={handleChange}
        selectedItem={selectedItem}
      >
        {({ getInputProps }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder,
          });
          return (
            <div>
              <TextField
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: selectedItem.map((item) => (
                    <Chip
                      key={item}
                      tabIndex={-1}
                      label={item}
                      className={classes.chip}
                      onDelete={handleDelete(item)}
                    />
                  )),
                  onBlur,
                  onChange: (event) => {
                    handleInputChange(event);
                    onChange &&
                      onChange(event as React.FormEvent<HTMLInputElement>);
                  },
                  onFocus,
                }}
                required={required}
                autoComplete={autoComplete}
                placeholder={placeholder}
                id={id}
                name={name}
                value={inputProps.value}
                onKeyDown={inputProps.onKeyDown}
                label={label}
                type={type}
                error={!!errMessage}
                helperText={errMessage}
              />
            </div>
          );
        }}
      </Downshift>
    </React.Fragment>
  );
}
