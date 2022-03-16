import * as React from "react";
import InputSelect from "./InputSelect";
import VALUE_LIST from "../../common/constants/value.constant";

type Props = {
  value?: any;
  required?: boolean;
  onChange: (event: any) => void;
  errorField?: any;
};

export default function InputStatus({
  value = "",
  required,
  onChange,
  errorField,
}: Props) {
  return (
    <InputSelect
      label="Trạng thái"
      required={required}
      list={VALUE_LIST.FILTER_STATUS}
      value={value}
      onChange={onChange}
      errorField={errorField}
    />
  );
}
