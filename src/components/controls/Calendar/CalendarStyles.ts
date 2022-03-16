import { makeStyles } from "@mui/styles";

const CalendarStyles = makeStyles(() => ({
  btnShowCalendar: {
    width: "100%",
    border: "1px solid #e5e5e5",
    borderRadius: "4px",
    display: "flex",
    cursor: "pointer",
    color: "#000",
    padding: "8.5px 14px",
  },
  text: {
    marginLeft: 10,
    fontWeight: "normal",
    fontSize: 14,
  },
  leftCalendar: {
    width: 200,
    marginLeft: 16,
    paddingTop: 14,
  },
  rightCalendar: {
    marginRight: 12,
  },
  btnChooseRangeDate: {
    paddingLeft: 20,
    width: "100%",
    textAlign: "left",
    justifyContent: "unset",
    color: "#000",
    fontWeight: "normal",
    "&:hover": {
      backgroundColor: "#f6f6f6",
    },
  },
  divider: {
    margin: "12px 0",
    padding: "0px 20px",
  },
}));

export default CalendarStyles;
