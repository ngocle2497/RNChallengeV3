/* eslint-disable @typescript-eslint/no-var-requires */
import {Image, useImage} from '@shopify/react-native-skia';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {MaskViewProps} from '../type';

export const MaskView = ({image}: MaskViewProps) => {
  // state
  const {width, height} = useWindowDimensions();
  // render
  return (
    <Image
      fit={'cover'}
      width={width}
      height={height}
      x={0}
      y={0}
      image={image}
    />
  );
};
