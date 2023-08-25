export default interface DateProps {
  month: number;
  day: number;
  year: number;
}

export interface ScheduleProps {
  nickName: string;
  date: string;
  schedule: string;
  share: boolean;
  selectedDate: DateProps;
}
