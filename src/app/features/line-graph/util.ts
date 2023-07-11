import gaussian from 'gaussian';
import {useMemo} from 'react';
import {Gesture} from 'react-native-gesture-handler';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import {DataChart} from './type';

function weightedRandom(mean: number, variance: number): number {
  const distribution = gaussian(mean, variance);
  // Take a random sample using inverse transform sampling method.
  return distribution.ppf(Math.random());
}

export const randomDataChart = (): Array<DataChart> => {
  return Array(60)
    .fill(0)
    .map((_, i) => ({
      price: Math.abs(weightedRandom(0, Math.pow(i + 10, 1))),
      date: new Date(i).getTime(),
    }));
};

export function usePanGesture(onInterpolating: SharedValue<boolean>) {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const isPanGestureActive = useSharedValue(false);

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onChange(e => {
          if (!onInterpolating.value) {
            x.value = e.x;
            y.value = e.y;
          }
        })
        .onStart(() => {
          isPanGestureActive.value = true;
        })
        .onEnd(() => {
          isPanGestureActive.value = false;
        }),
    [isPanGestureActive, onInterpolating, x, y],
  );

  return useMemo(() => {
    return {
      gesture: panGesture,
      isActive: isPanGestureActive,
      x: x,
      y: y,
    };
  }, [isPanGestureActive, panGesture, x, y]);
}
