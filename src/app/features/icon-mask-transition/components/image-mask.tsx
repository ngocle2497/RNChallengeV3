import React from 'react';

import {
  Blur,
  Image,
  runTiming,
  usePaintRef,
  useValue,
  useValueEffect,
} from '@shopify/react-native-skia';

import { HEIGHT_CANVAS, WIDTH_CANVAS } from '../constant';
import { ImageMaskProps } from '../type';

export const ImageMask = ({ imageSK, activeImage }: ImageMaskProps) => {
  // state
  const blur = useValue(90);
  const paint = usePaintRef();

  // effect
  useValueEffect(activeImage, v => {
    if (v === imageSK) {
      runTiming(blur, 1);
    } else {
      runTiming(blur, 90);
    }
  });

  // render
  return (
    <Image
      layer={paint}
      x={(WIDTH_CANVAS - 250) / 2}
      y={(HEIGHT_CANVAS - 250) / 2}
      origin={{
        x: 200,
        y: 200,
      }}
      width={250}
      height={250}
      image={imageSK}
      fit="cover">
      <Blur blur={blur} />
    </Image>
  );
};
