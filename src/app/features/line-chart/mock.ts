/* eslint-disable max-params */
import { Dimensions } from 'react-native';

import { curveBumpX as curveBasis, line, scaleLinear, scaleTime } from 'd3';
import gaussian from 'gaussian';

import { DataChart, DataPath } from './type';

const DAY_LENGTH_DATA = 5;

const WEEK_LENGTH_DATA = DAY_LENGTH_DATA * 7;

const MONTH_LENGTH_DATA = DAY_LENGTH_DATA * 30;

const YEAR_LENGTH_DATA = DAY_LENGTH_DATA * 10;

export const GRAPH_HEIGHT = 350;

export const GRAPH_WIDTH = Dimensions.get('window').width - 20;

export const GRAPH_DAY_WIDTH = Dimensions.get('window').width - 20;

export const GRAPH_WEEK_WIDTH = GRAPH_DAY_WIDTH * 1.2;

export const GRAPH_MONTH_WIDTH = GRAPH_DAY_WIDTH * 1.5;

export const GRAPH_YEAR_WIDTH = GRAPH_DAY_WIDTH * 5;

function weightedRandom(mean: number, variance: number): number {
  const distribution = gaussian(mean, variance);

  // Take a random sample using inverse transform sampling method.
  return distribution.ppf(Math.random());
}

const getPathChart = (
  data: Array<DataChart>,
  max: number,
  numberOfPoint: number,
  width: number,
) => {
  const y = scaleLinear()
    .domain([0, max])
    .range([GRAPH_HEIGHT - 10, 35]);

  const x = scaleTime()
    .domain([data[0].date, data[data.length - 1].date])
    .range([10, width - 10]);

  const naturalParts = Math.floor(numberOfPoint / data.length);

  // const actualData: Array<DataChart> = Array(numberOfPoint)
  //   .fill(0)
  //   .map((_, i) => {
  //     const fakeData = data[i] ?? data[data.length - 1];
  //     return fakeData;
  //   });
  const actualData: Array<DataChart> = [];

  data.forEach((element, i) => {
    if (i === data.length - 1) {
      actualData.push(
        ...Array(naturalParts + (numberOfPoint % data.length)).fill(element),
      );
    } else {
      actualData.push(...Array(naturalParts).fill(element));
    }
  });

  const curvedLine = line<DataChart>()
    .x(d => x(new Date(d.date)))
    .y(d => y(d.value))
    .curve(curveBasis)(actualData) as string;

  return curvedLine;
};

export const randomDataChart = (): {
  dayData: DataPath;
  weekData: DataPath;
  monthData: DataPath;
  yearData: DataPath;
} => {
  // year
  const yearDataChart: Array<DataChart> = Array(YEAR_LENGTH_DATA)
    .fill(0)
    .map((_, i) => ({
      value: Math.abs(weightedRandom(0, Math.pow(i + 1, 1))),
      date: new Date(i),
    }));

  const maxYear = Math.max(...yearDataChart.map(x => x.value));

  const minYear = Math.min(...yearDataChart.map(x => x.value));

  const pYear = getPathChart(
    yearDataChart,
    maxYear,
    YEAR_LENGTH_DATA,
    GRAPH_YEAR_WIDTH,
  );

  // day
  const dayDataChart: Array<DataChart> = yearDataChart.slice(
    0,
    DAY_LENGTH_DATA,
  );

  const maxDay = Math.max(...dayDataChart.map(x => x.value));

  const minDay = Math.min(...dayDataChart.map(x => x.value));

  const pDay = getPathChart(
    dayDataChart,
    maxDay,
    YEAR_LENGTH_DATA,
    GRAPH_DAY_WIDTH,
  );

  // week
  const weekDataChart = yearDataChart.slice(0, WEEK_LENGTH_DATA);

  const maxWeek = Math.max(...weekDataChart.map(x => x.value));

  const minWeek = Math.min(...weekDataChart.map(x => x.value));

  const pWeek = getPathChart(
    weekDataChart,
    maxWeek,
    YEAR_LENGTH_DATA,
    GRAPH_WEEK_WIDTH,
  );

  // month
  const monthDataChart = yearDataChart.slice(0, MONTH_LENGTH_DATA);

  const maxMonth = Math.max(...monthDataChart.map(x => x.value));

  const minMonth = Math.min(...monthDataChart.map(x => x.value));

  const pMonth = getPathChart(
    monthDataChart,
    maxMonth,
    YEAR_LENGTH_DATA,
    GRAPH_MONTH_WIDTH,
  );

  return {
    dayData: {
      color: '#2ecc71',
      data: dayDataChart,
      path: pDay,
      max: maxDay,
      min: minDay,
      width: GRAPH_DAY_WIDTH,
    },
    weekData: {
      color: '#8e44ad',
      data: weekDataChart,
      path: pWeek,
      max: maxWeek,
      min: minWeek,
      width: GRAPH_WEEK_WIDTH,
    },
    monthData: {
      color: '#f1c40f',
      data: monthDataChart,
      path: pMonth,
      max: maxMonth,
      min: minMonth,
      width: GRAPH_MONTH_WIDTH,
    },
    yearData: {
      color: '#e74c3c',
      data: yearDataChart,
      path: pYear,
      max: maxYear,
      min: minYear,
      width: GRAPH_YEAR_WIDTH,
    },
  };
};
