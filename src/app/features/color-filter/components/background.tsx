import React from 'react';
import { useWindowDimensions } from 'react-native';

import { Image, useImage } from '@shopify/react-native-skia';

import { images } from '../../../assets/images';

export const Background = () => {
  // state
  const image = useImage(images.cat);
  const { width, height } = useWindowDimensions();
  if (!image) {
    return null;
  }
  // render
  return (
    <Image
      x={0}
      y={0}
      width={width}
      height={height / 2}
      image={image}
      fit="cover">
      {/* <ColorMatrix
        matrix={[
          -0.578, 0.99, 0.588, 0, 0, 0.469, 0.535, -0.003, 0, 0, 0.015, 1.69,
          -0.703, 0, 0, 0, 0, 0, 1, 0,
        ]}
      /> */}
    </Image>
  );
};
