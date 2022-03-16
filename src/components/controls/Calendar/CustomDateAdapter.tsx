import DateIOAdapter from "@mui/lab/AdapterMoment";

export default function CustomDateAdapter(...options: any): any {
  const adapter = new DateIOAdapter(options);
  const constructDayObject = (day: string) => ({ charAt: () => day });

  return {
    ...adapter,
    getWeekdays() {
      const customWeekdays = adapter.getWeekdays();
      return customWeekdays.map((day) => {
        return constructDayObject(day);
      });
    },
  };
}
