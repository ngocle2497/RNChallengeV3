import React, { memo } from 'react';

import { Image, useImage } from '@shopify/react-native-skia';

import { images } from '../../../assets/images';
import { WIDTH_CANVAS } from '../constant';

export const BackgroundImage = memo(
  () => {
    const girl = useImage(images.girl);

    if (!girl) {
      return null;
    }

    // render
    return (
      <Image
        x={0}
        y={-110}
        width={WIDTH_CANVAS}
        height={550}
        image={girl}
        fit="cover"
      />
    );
  },
  () => true,
);
