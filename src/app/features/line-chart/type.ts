export type DataChart = {
  date: Date;
  value: number;
};

export type DataPath = {
  color: string;
  data: Array<DataChart>;
  path: string;
  max: number;
  min: number;
  width: number;
};
