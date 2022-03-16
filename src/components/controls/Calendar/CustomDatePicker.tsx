import * as React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import PickersDay, { PickersDayProps } from "@mui/lab/PickersDay";
import CustomDateAdapter from "./CustomDateAdapter";
import { DateRange } from "@mui/lab/DateRangePicker";
import moment from "moment";

type CustomPickerDayProps = PickersDayProps<Date> & {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
};

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
    border: "none !important",
  }),
  ...(isFirstDay && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: 0,
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
    border: "none !important",
  }),
  ...(isLastDay && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
    border: "none !important",
  }),
})) as React.ComponentType<CustomPickerDayProps>;

interface IProps {
  value: Date | null;
  dateRange: DateRange<Date>;
  onChangeDateInput: (newValue: Date | null) => void;
}

export default function CustomDayPicker(props: IProps) {
  const { dateRange, value, onChangeDateInput } = props;

  const renderWeekPickerDay = (
    date: Date,
    selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>
  ) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = dateRange[0];
    const end = dateRange[1];

    const dayIsBetween = moment(date).isBetween(start, end);
    const isFirstDay = moment(date).isSame(start, "date");
    const isLastDay = moment(date).isSame(end, "date");

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={CustomDateAdapter as any} locale="vi">
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={value}
        showDaysOutsideCurrentMonth
        onChange={onChangeDateInput}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
