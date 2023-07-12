import React from 'react';
import { useWindowDimensions } from 'react-native';

import { interpolate, useDerivedValue } from 'react-native-reanimated';

import {
  ColorMatrix,
  Extrapolate,
  Image,
  useImage,
} from '@shopify/react-native-skia';

import { images } from '../../../assets/images';
import {
  A1_OUTPUT_RANGE,
  A2_OUTPUT_RANGE,
  A3_OUTPUT_RANGE,
  A4_OUTPUT_RANGE,
  A5_OUTPUT_RANGE,
  B1_OUTPUT_RANGE,
  B2_OUTPUT_RANGE,
  B3_OUTPUT_RANGE,
  B4_OUTPUT_RANGE,
  B5_OUTPUT_RANGE,
  G1_OUTPUT_RANGE,
  G2_OUTPUT_RANGE,
  G3_OUTPUT_RANGE,
  G4_OUTPUT_RANGE,
  G5_OUTPUT_RANGE,
  INPUT_RANGE,
  R1_OUTPUT_RANGE,
  R2_OUTPUT_RANGE,
  R3_OUTPUT_RANGE,
  R4_OUTPUT_RANGE,
  R5_OUTPUT_RANGE,
} from '../constants';
import { BackgroundProps } from '../type';

const skiaInterpolate = (x: number, outputRange: number[]) => {
  'worklet';

  return interpolate(x, INPUT_RANGE, outputRange, Extrapolate.CLAMP);
};

export const Background = ({ scrollX }: BackgroundProps) => {
  // state
  const image = useImage(images.cat);

  const { width, height } = useWindowDimensions();

  const matrix = useDerivedValue(() => {
    const R1 = skiaInterpolate(scrollX.value, R1_OUTPUT_RANGE);

    const R2 = skiaInterpolate(scrollX.value, R2_OUTPUT_RANGE);

    const R3 = skiaInterpolate(scrollX.value, R3_OUTPUT_RANGE);

    const R4 = skiaInterpolate(scrollX.value, R4_OUTPUT_RANGE);

    const R5 = skiaInterpolate(scrollX.value, R5_OUTPUT_RANGE);

    const G1 = skiaInterpolate(scrollX.value, G1_OUTPUT_RANGE);

    const G2 = skiaInterpolate(scrollX.value, G2_OUTPUT_RANGE);

    const G3 = skiaInterpolate(scrollX.value, G3_OUTPUT_RANGE);

    const G4 = skiaInterpolate(scrollX.value, G4_OUTPUT_RANGE);

    const G5 = skiaInterpolate(scrollX.value, G5_OUTPUT_RANGE);

    const B1 = skiaInterpolate(scrollX.value, B1_OUTPUT_RANGE);

    const B2 = skiaInterpolate(scrollX.value, B2_OUTPUT_RANGE);

    const B3 = skiaInterpolate(scrollX.value, B3_OUTPUT_RANGE);

    const B4 = skiaInterpolate(scrollX.value, B4_OUTPUT_RANGE);

    const B5 = skiaInterpolate(scrollX.value, B5_OUTPUT_RANGE);

    const A1 = skiaInterpolate(scrollX.value, A1_OUTPUT_RANGE);

    const A2 = skiaInterpolate(scrollX.value, A2_OUTPUT_RANGE);

    const A3 = skiaInterpolate(scrollX.value, A3_OUTPUT_RANGE);

    const A4 = skiaInterpolate(scrollX.value, A4_OUTPUT_RANGE);

    const A5 = skiaInterpolate(scrollX.value, A5_OUTPUT_RANGE);

    return [
      R1,
      R2,
      R3,
      R4,
      R5,
      G1,
      G2,
      G3,
      G4,
      G5,
      B1,
      B2,
      B3,
      B4,
      B5,
      A1,
      A2,
      A3,
      A4,
      A5,
    ];
  }, [scrollX]);

  // effect
  if (!image) {
    return null;
  }

  // render
  return (
    <>
      <Image
        x={0}
        y={0}
        width={width}
        height={height / 2}
        image={image}
        fit="cover">
        <ColorMatrix matrix={matrix} />
      </Image>
    </>
  );
};
