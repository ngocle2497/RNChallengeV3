import React from 'react';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {FILL_COLOR} from '../constants';
import {GridProps} from '../type';

export const Grid = ({bottom, left, top, right, gesture}: GridProps) => {
  // render
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={{
          bottom,
          left,
          top,
          right,
          borderWidth: 2,
          borderColor: FILL_COLOR,
          position: 'absolute',
        }}
      />
    </GestureDetector>
  );
};
