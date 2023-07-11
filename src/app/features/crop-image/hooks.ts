import {useMemo} from 'react';
import {Gesture} from 'react-native-gesture-handler';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import {CALCULATED_IMAGE_WIDTH} from './constants';

type GestureArgs = {
  x1: SharedValue<number>;
  y1: SharedValue<number>;
  x2: SharedValue<number>;
  y2: SharedValue<number>;
};

export const useGesture = ({x1, x2, y1, y2}: GestureArgs) => {
  const currentWidth = useSharedValue(0);
  const currentHeight = useSharedValue(0);
  const topLeftGesture = useMemo(() => {
    return Gesture.Pan().onChange(({changeX, changeY}) => {
      x1.value += changeX;
      y1.value += changeY;
    });
  }, []);

  const topRightGesture = useMemo(() => {
    return Gesture.Pan().onChange(({changeX, changeY}) => {
      x2.value += changeX;
      y1.value += changeY;
    });
  }, []);

  const bottomLeftGesture = useMemo(() => {
    return Gesture.Pan().onChange(({changeX, changeY}) => {
      x1.value += changeX;
      y2.value += changeY;
    });
  }, []);

  const bottomRightGesture = useMemo(() => {
    return Gesture.Pan().onChange(({changeX, changeY}) => {
      x2.value += changeX;
      y2.value += changeY;
    });
  }, []);

  const gridGesture = useMemo(() => {
    return Gesture.Pan()
      .onStart(() => {
        currentWidth.value = Math.abs(x2.value - x1.value);
      })
      .onChange(({changeX, changeY}) => {
        const nextLeftX = x1.value + changeX;
        const nextRightX = x2.value + changeX;
        if (x1.value < x2.value) {
          if (nextLeftX >= 0 && nextRightX <= CALCULATED_IMAGE_WIDTH) {
            x1.value += changeX;
            x2.value += changeX;
          }
        } else {
          if (nextRightX >= 0 && nextLeftX <= CALCULATED_IMAGE_WIDTH) {
            x1.value += changeX;
            x2.value += changeX;
          }
        }

        const nextTopY = y1.value + changeY;
        const nextBottomY = y2.value + changeY;
        if (y1.value < y2.value) {
          if (nextTopY >= 0 && nextBottomY <= CALCULATED_IMAGE_WIDTH) {
            y1.value += changeY;
            y2.value += changeY;
          }
        } else {
          if (nextBottomY >= 0 && nextTopY <= CALCULATED_IMAGE_WIDTH) {
            y1.value += changeY;
            y2.value += changeY;
          }
        }
      });
  }, []);

  return {
    gridGesture,
    topLeftGesture,
    topRightGesture,
    bottomLeftGesture,
    bottomRightGesture,
  };
};
