import React from 'react';
import { Dimensions } from 'react-native';

import {
  Circle,
  interpolate,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';

import { getRandomColor } from '../constant';
import { DotProps } from '../type';

const { width, height } = Dimensions.get('window');

const center = {
  x: width / 2,
  y: height / 2,
};

export const Dot = ({ index, progress }: DotProps) => {
  // state
  const goldenAngle1 = useValue(Math.PI * (3 - Math.sqrt(6)));

  const goldenAngle2 = useValue(Math.PI * (3 - Math.sqrt(5)));

  const radius = useComputedValue(
    () => interpolate(progress.current, [0, 0.5, 1], [16, 80, 16]),
    [progress],
  );

  const x1 = useComputedValue(() => {
    const angle = index * goldenAngle1.current;

    const distance = radius.current * Math.sqrt(index);

    const x = center.x + distance * Math.cos(angle);

    return x;
  }, [goldenAngle1, radius]);

  const x2 = useComputedValue(() => {
    const angle = index * goldenAngle2.current;

    const distance = radius.current * Math.sqrt(index);

    const x = center.x + distance * Math.cos(angle);

    return x;
  }, [goldenAngle2, radius]);

  const x = useComputedValue(
    () => interpolate(progress.current, [0, 1], [x1.current, x2.current]),
    [progress],
  );

  const y1 = useComputedValue(() => {
    const angle = index * goldenAngle1.current;

    const distance = radius.current * Math.sqrt(index);

    const y = center.y + distance * Math.sin(angle);

    return y;
  }, [goldenAngle1, radius]);

  const y2 = useComputedValue(() => {
    const angle = index * goldenAngle2.current;

    const distance = radius.current * Math.sqrt(index);

    const y = center.y + distance * Math.sin(angle);

    return y;
  }, [goldenAngle2, radius]);

  const y = useComputedValue(
    () => interpolate(progress.current, [0, 1], [y1.current, y2.current]),
    [progress],
  );

  const r = useComputedValue(() => {
    const distance = 300 - 18 * Math.sqrt(index);

    const res = Math.sqrt(distance / Math.PI);

    return interpolate(progress.current, [0, 0.5, 1], [res, 1, res]);
  }, [progress]);

  // render
  return <Circle cx={x} cy={y} r={r} color={getRandomColor()} />;
};
