import React from 'react';

import {useDerivedValue} from 'react-native-reanimated';

import {Group, Image} from '@shopify/react-native-skia';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constant';
import {OverlayMaskProps} from '../type';

export const OverlayMask = ({image, scaleMask}: OverlayMaskProps) => {
  // skProps
  const transform = useDerivedValue(() => [{scale: scaleMask.value}]);

  // render
  return (
    <Group
      transform={transform}
      origin={{x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 2}}>
      <Image
        x={0}
        y={0}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        fit={'cover'}
        image={image}
      />
    </Group>
  );
};
