import React, { useEffect } from 'react';

import { Blur, Image, runTiming, useValue } from '@shopify/react-native-skia';

import { HEIGHT_CANVAS, WIDTH_CANVAS } from '../constant';
import { ImageMaskProps } from '../type';

export const ImageMask = ({ imageSK, activeImage }: ImageMaskProps) => {
  // state
  const blur = useValue(10);

  const opacity = useValue(0);

  // effect
  useEffect(() => {
    if (activeImage === imageSK) {
      runTiming(blur, 1);

      runTiming(opacity, 1);
    } else {
      runTiming(blur, 20);

      runTiming(opacity, 0);
    }
  }, [activeImage]);

  // render
  return (
    <Image
      x={(WIDTH_CANVAS - 250) / 2}
      y={(HEIGHT_CANVAS - 250) / 2}
      origin={{
        x: 200,
        y: 200,
      }}
      width={250}
      height={250}
      image={imageSK}
      opacity={opacity}
      fit="cover">
      <Blur blur={blur} />
    </Image>
  );
};
