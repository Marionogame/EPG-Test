export interface IEpg {
  id: string;
  title: string;
  images: { LOGO: string };
  schedules: ISchedules[];
}
export interface ISchedules {
  id: string;
  title: string;
  start: number;
  end: number;
}
