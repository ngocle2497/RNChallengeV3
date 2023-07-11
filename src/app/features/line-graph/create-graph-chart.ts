import {Skia, SkPoint} from '@shopify/react-native-skia';
import {DataChart} from './type';

export const PADDING = 16;
const PIXEL_RATIO = 1;

export interface GraphXRange {
  min: number;
  max: number;
}

export interface GraphYRange {
  min: number;
  max: number;
}

export const getXPositionInRange = (
  date: number,
  xRange: GraphXRange,
): number => {
  const diff = xRange.max - xRange.min;
  const x = date;

  return (x - xRange.min) / diff;
};

export const getXInRange = (
  width: number,
  date: number,
  xRange: GraphXRange,
): number => {
  return Math.floor(width * getXPositionInRange(date, xRange));
};
export const getYPositionInRange = (
  value: number,
  yRange: GraphYRange,
): number => {
  const diff = yRange.max - yRange.min;
  const y = value;

  return (y - yRange.min) / diff;
};

export const getYInRange = (
  height: number,
  value: number,
  yRange: GraphYRange,
): number => {
  return Math.floor(height * getYPositionInRange(value, yRange));
};
export function getGraphPathRange(points: DataChart[]) {
  const minValueX = points[0]?.date ?? new Date();
  const maxValueX = points[points.length - 1]?.date ?? new Date();

  const minValueY = points.reduce(
    (prev, curr) => (curr.price < prev ? curr.price : prev),
    Number.MAX_SAFE_INTEGER,
  );
  const maxValueY = points.reduce(
    (prev, curr) => (curr.price > prev ? curr.price : prev),
    Number.MIN_SAFE_INTEGER,
  );

  return {
    x: {min: minValueX, max: maxValueX},
    y: {min: minValueY, max: maxValueY},
  };
}

export const buildGraph = ({
  data,
  width,
  height,
}: {
  data: Array<DataChart>;
  width: number;
  height: number;
}) => {
  const path = Skia.Path.Make();

  // Canvas width substracted by the horizontal padding => Actual drawing width
  const drawingWidth = width - 2 * PADDING;
  // Canvas height substracted by the vertical padding => Actual drawing height
  const drawingHeight = height - 2 * PADDING;
  if (data[0] == null) return path;
  const points: SkPoint[] = [];
  const range = getGraphPathRange(data);

  const startX = getXInRange(drawingWidth, data[0]!.date, range.x) + PADDING;
  const endX =
    getXInRange(drawingWidth, data[data.length - 1]!.date, range.x) + PADDING;

  const getGraphDataIndex = (pixel: number) =>
    Math.round(((pixel - startX) / (endX - startX)) * (data.length - 1));

  const getNextPixelValue = (pixel: number) => {
    if (pixel === endX || pixel + PIXEL_RATIO < endX)
      return pixel + PIXEL_RATIO;
    return endX;
  };
  for (
    let pixel = startX;
    startX <= pixel && pixel <= endX;
    pixel = getNextPixelValue(pixel)
  ) {
    const index = getGraphDataIndex(pixel);

    // Draw first point only on the very first pixel
    if (index === 0 && pixel !== startX) continue;
    // Draw last point only on the very last pixel

    if (index === data.length - 1 && pixel !== endX) continue;

    if (index !== 0 && index !== data.length - 1) {
      // Only draw point, when the point is exact
      const exactPointX =
        getXInRange(drawingWidth, data[index]!.date, range.x) + PADDING;

      const isExactPointInsidePixelRatio = Array(PIXEL_RATIO)
        .fill(0)
        .some((_value, additionalPixel) => {
          return pixel + additionalPixel === exactPointX;
        });
      if (!isExactPointInsidePixelRatio) continue;
    }

    const value = data[index]!.price;
    const y =
      drawingHeight - getYInRange(drawingHeight, value, range.y) + PADDING;

    points.push({x: pixel, y: y});
  }

  for (let i = 0; i < points.length; i++) {
    const point = points[i]!;

    // first point needs to start the path
    if (i === 0) path.moveTo(point.x, point.y);

    const prev = points[i - 1];
    const prevPrev = points[i - 2];

    if (prev == null) continue;

    const p0 = prevPrev ?? prev;
    const p1 = prev;
    const cp1x = (2 * p0.x + p1.x) / 3;
    const cp1y = (2 * p0.y + p1.y) / 3;
    const cp2x = (p0.x + 2 * p1.x) / 3;
    const cp2y = (p0.y + 2 * p1.y) / 3;
    const cp3x = (p0.x + 4 * p1.x + point.x) / 6;
    const cp3y = (p0.y + 4 * p1.y + point.y) / 6;

    path.cubicTo(cp1x, cp1y, cp2x, cp2y, cp3x, cp3y);

    if (i === points.length - 1) {
      path.cubicTo(point.x, point.y, point.x, point.y, point.x, point.y);
    }
  }
  return path;
};
