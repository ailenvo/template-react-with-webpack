import * as React from "react";
import Box from "@mui/material/Box";
import { DateRange } from "@mui/lab/DateRangePicker";
import Typography from "@mui/material/Typography";
import moment, { Moment } from "moment";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Button, Grid, Popover } from "@mui/material";
import { Divider } from "@mui/material";
import CustomDayPicker from "./CustomDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CalendarPicker from "@mui/lab/CalendarPicker";
import AdapterMoment from "@mui/lab/AdapterMoment";
import CalendarStyles from "./CalendarStyles";

export enum CalendarType {
  SelectDate = "SelectDate",
  SelectWeek = "SelectWeek",
  SelectMonth = "SelectMonth",
}

export enum TextDateType {
  Date = "Date",
  Range = "Range",
  Month = "Month",
}

const calenderTypeValues = [
  {
    type: CalendarType.SelectDate,
    text: "Theo ngày",
    textType: TextDateType.Date,
  },
  {
    type: CalendarType.SelectWeek,
    text: "Theo tuần",
    textType: TextDateType.Range,
  },
  {
    type: CalendarType.SelectMonth,
    text: "Theo tháng",
    textType: TextDateType.Month,
  },
];

export interface IFilterDate {
  title: string;
  startDate: Date;
  endDate: Date;
  key: string;
  textType: TextDateType;
}

const getFilterRangeDate = (): IFilterDate[] => {
  const date = new Date();

  const filterDate: IFilterDate[] = [
    {
      title: "Hôm qua",
      startDate: moment(date)
        .set("dates", date.getDate() - 1)
        .set("hours", 0)
        .set("minutes", 0)
        .set("seconds", 0)
        .toDate(),
      endDate: moment(date)
        .set("dates", date.getDate() - 1)
        .set("hours", 23)
        .set("minutes", 59)
        .set("seconds", 0)
        .toDate(),
      key: "LastDay",
      textType: TextDateType.Date,
    },
    {
      title: "Trong 7 ngày qua",
      startDate: moment(date)
        .set("dates", date.getDate() - 6)
        .set("hours", 0)
        .set("minutes", 0)
        .set("seconds", 0)
        .toDate(),
      endDate: moment(date)
        .set("hours", 23)
        .set("minutes", 59)
        .set("seconds", 0)
        .toDate(),
      key: "In7DayLeft",
      textType: TextDateType.Range,
    },
    {
      title: "Trong 30 ngày qua",
      startDate: moment(date)
        .set("dates", date.getDate() - 29)
        .set("hours", 0)
        .set("minutes", 0)
        .set("seconds", 0)
        .toDate(),
      endDate: moment(date)
        .set("hours", 23)
        .set("minutes", 59)
        .set("seconds", 0)
        .toDate(),
      key: "In30DayLeft",
      textType: TextDateType.Range,
    },
    {
      title: "Tuần này",
      startDate: moment(date)
        .startOf("weeks")
        .set("hours", 0)
        .set("minutes", 0)
        .set("seconds", 0)
        .toDate(),
      endDate: moment(date)
        .endOf("weeks")
        .set("hours", 23)
        .set("minutes", 59)
        .set("seconds", 0)
        .toDate(),
      key: "InWeek",
      textType: TextDateType.Range,
    },
    {
      title: "Tháng này",
      startDate: moment(date)
        .startOf("months")
        .set("hours", 0)
        .set("minutes", 0)
        .set("seconds", 0)
        .toDate(),
      endDate: moment(date)
        .endOf("months")
        .set("hours", 23)
        .set("minutes", 59)
        .set("seconds", 0)
        .toDate(),
      key: "InMonth",
      textType: TextDateType.Range,
    },
  ];

  return filterDate;
};

interface IProps {
  onChange: (dateRange: DateRange<Moment>) => void;
}

export default function MultiCalender(props: IProps) {
  const classes = CalendarStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [value, setValue] = React.useState<Date | null>(new Date());
  const [dateRange, setDateRange] = React.useState<DateRange<Date>>([
    new Date(),
    new Date(),
  ]);
  const [calendarType, setCalendarType] = React.useState<CalendarType>(
    CalendarType.SelectDate
  );
  const [selectedFilter, setSelectedFilter] = React.useState<string | null>(
    null
  );
  const [textType, setTextType] = React.useState<TextDateType>(
    TextDateType.Date
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filterDate, _] = React.useState<IFilterDate[]>(getFilterRangeDate());

  const handleChangeTypeDatePicker = (
    type: CalendarType,
    textType: TextDateType
  ) => {
    setCalendarType(type);
    setSelectedFilter(null);
    setDateRange([null, null]);
    setTextType(textType);
    setValue(null);
  };

  const onChangeDateInput = (newValue: Date | null) => {
    let dates = [];
    const date = newValue;

    if (calendarType === CalendarType.SelectDate) {
      dates = [date, date] as any;
    }
    if (calendarType === CalendarType.SelectWeek) {
      const startDate = moment(date).startOf("isoWeek");
      const endDate = moment(date).endOf("isoWeek");
      dates = [startDate, endDate] as any;
    }
    if (calendarType === CalendarType.SelectMonth) {
      const startDate = moment(date).startOf("months");
      const endDate = moment(date).endOf("months");
      dates = [startDate, endDate] as any;
    }

    setValue(date);
    setDateRange(dates);
    props.onChange(dates);
    handleClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterDate = (filter: IFilterDate) => {
    const newValue = [moment(filter.startDate), moment(filter.endDate)] as any;
    setDateRange(newValue);
    props.onChange(newValue);
    setValue(filter.startDate);
    setSelectedFilter(filter.key);
    setCalendarType(CalendarType.SelectDate);
    setTextType(filter.textType);
    handleClose();
  };

  const renderTextInput = () => {
    if (selectedFilter) {
      const filter = filterDate.find((f) => f.key === selectedFilter);

      return filter?.title;
    }
    if (calendarType) {
      const filter = calenderTypeValues.find((f) => f.type === calendarType);

      return filter?.text;
    }

    return "";
  };

  const renderDate = () => {
    if (textType === TextDateType.Date) {
      return (
        <Typography className={classes.text}>
          {value ? moment(value).format("DD-MM-YYYY") : ""}
        </Typography>
      );
    }
    if (textType === TextDateType.Month) {
      return (
        <Typography className={classes.text}>
          {value ? moment(value).format("MMMM YYYY") : ""}
        </Typography>
      );
    }

    return dateRange.map((item, i) => {
      return i === 0 ? (
        <React.Fragment key={i}>
          <Typography className={classes.text}>
            {item ? moment(item).format("DD-MM-YYYY") : ""}
          </Typography>
          <Typography className={classes.text} key={"-"}>
            -
          </Typography>
        </React.Fragment>
      ) : (
        <Typography className={classes.text} key={i}>
          {item ? moment(item).format("DD-MM-YYYY") : ""}
        </Typography>
      );
    });
  };

  const isViewMonth = calendarType === CalendarType.SelectMonth;

  return (
    <Box sx={{ marginLeft: 1, position: "relative" }}>
      <Grid sx={{ display: "flex", position: "relative" }}>
        <Button
          aria-describedby={id}
          className={classes.btnShowCalendar}
          variant="text"
          onClick={handleClick}
        >
          <DateRangeIcon style={{ color: "#b7b7b7", fontSize: 20 }} />
          <Typography className={classes.text}>
            {renderTextInput()} :
          </Typography>
          {renderDate()}
        </Button>
      </Grid>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Grid container spacing={2} sx={{ mt: 0 }}>
          <Box className={classes.leftCalendar}>
            {filterDate.map((item, i) => (
              <Button
                key={i}
                style={{
                  color: selectedFilter === item.key ? "red" : undefined,
                }}
                className={classes.btnChooseRangeDate}
                onClick={() => handleFilterDate(item)}
              >
                {item.title}
              </Button>
            ))}
            <div className={classes.divider}>
              <Divider />
            </div>
            {calenderTypeValues.map((item) => (
              <Button
                key={item.type}
                style={{
                  color:
                    !selectedFilter && calendarType === item.type
                      ? "red"
                      : undefined,
                }}
                className={classes.btnChooseRangeDate}
                onClick={() =>
                  handleChangeTypeDatePicker(item.type, item.textType)
                }
              >
                {item.text}
              </Button>
            ))}
          </Box>
          <Box className={classes.rightCalendar}>
            {isViewMonth ? (
              <LocalizationProvider dateAdapter={AdapterMoment} locale="vi">
                <CalendarPicker
                  views={["month", "year"]}
                  openTo="month"
                  date={value}
                  onChange={onChangeDateInput}
                />
              </LocalizationProvider>
            ) : (
              <CustomDayPicker
                value={value}
                onChangeDateInput={onChangeDateInput}
                dateRange={dateRange}
              />
            )}
          </Box>
        </Grid>
      </Popover>
    </Box>
  );
}
