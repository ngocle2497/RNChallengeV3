import React from 'react';

import {
  Group,
  Path,
  runTiming,
  Skia,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  PIE_RADIUS,
  PIE_STROKE_WIDTH,
} from './constant';
import { PathCircleProps } from './type';

export const PathCircle = ({ color, index, pieData }: PathCircleProps) => {
  // state
  const start = useValue(0);
  const end = useValue(0);
  const path = useValue(
    Skia.Path.Make().moveTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2),
  );
  const rotate = useValue(0);

  // effect
  const transform = useComputedValue(() => {
    return [{ rotate: rotate.current }];
  }, [rotate]);
  useComputedValue(() => {
    const newPath = Skia.Path.Make()
      .moveTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
      .addOval(
        {
          x: CANVAS_WIDTH / 2 - PIE_RADIUS,
          y: CANVAS_HEIGHT / 2 - PIE_RADIUS,
          width: PIE_RADIUS * 2,
          height: PIE_RADIUS * 2,
        },
        true,
      );
    path.current = newPath;
    const nextEnd = 1 * (pieData.current[index].percent / 100);
    runTiming(end, nextEnd);
    runTiming(
      rotate,

      -Math.PI * 0.2 +
        (-Math.PI * 2 * pieData.current[index].percentStart) / 100,
    );
  }, [pieData]);

  // render
  return (
    <Group
      origin={{ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 }}
      transform={transform}>
      <Path
        start={start}
        end={end}
        path={path}
        style={'stroke'}
        color={color}
        strokeWidth={PIE_STROKE_WIDTH}
      />
    </Group>
  );
};
