import React from 'react';
import { useWindowDimensions } from 'react-native';

import {
  ColorMatrix,
  Extrapolate,
  Image,
  interpolate,
  Paint,
  useComputedValue,
  useImage,
  usePaintRef,
  useValueEffect,
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

const skiaInterpolate = (x: number, outputRange: number[]) =>
  interpolate(x, INPUT_RANGE, outputRange, Extrapolate.CLAMP);

export const Background = ({ scrollX, updateCanvas }: BackgroundProps) => {
  // state
  const image = useImage(images.cat);
  const matrixRef = usePaintRef();

  const { width, height } = useWindowDimensions();
  const matrix = useComputedValue(() => {
    const R1 = skiaInterpolate(scrollX.current, R1_OUTPUT_RANGE);
    const R2 = skiaInterpolate(scrollX.current, R2_OUTPUT_RANGE);
    const R3 = skiaInterpolate(scrollX.current, R3_OUTPUT_RANGE);
    const R4 = skiaInterpolate(scrollX.current, R4_OUTPUT_RANGE);
    const R5 = skiaInterpolate(scrollX.current, R5_OUTPUT_RANGE);

    const G1 = skiaInterpolate(scrollX.current, G1_OUTPUT_RANGE);
    const G2 = skiaInterpolate(scrollX.current, G2_OUTPUT_RANGE);
    const G3 = skiaInterpolate(scrollX.current, G3_OUTPUT_RANGE);
    const G4 = skiaInterpolate(scrollX.current, G4_OUTPUT_RANGE);
    const G5 = skiaInterpolate(scrollX.current, G5_OUTPUT_RANGE);

    const B1 = skiaInterpolate(scrollX.current, B1_OUTPUT_RANGE);
    const B2 = skiaInterpolate(scrollX.current, B2_OUTPUT_RANGE);
    const B3 = skiaInterpolate(scrollX.current, B3_OUTPUT_RANGE);
    const B4 = skiaInterpolate(scrollX.current, B4_OUTPUT_RANGE);
    const B5 = skiaInterpolate(scrollX.current, B5_OUTPUT_RANGE);

    const A1 = skiaInterpolate(scrollX.current, A1_OUTPUT_RANGE);
    const A2 = skiaInterpolate(scrollX.current, A2_OUTPUT_RANGE);
    const A3 = skiaInterpolate(scrollX.current, A3_OUTPUT_RANGE);
    const A4 = skiaInterpolate(scrollX.current, A4_OUTPUT_RANGE);
    const A5 = skiaInterpolate(scrollX.current, A5_OUTPUT_RANGE);

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
  useValueEffect(matrix, updateCanvas);

  if (!image) {
    return null;
  }

  // render
  return (
    <>
      <Paint ref={matrixRef}>
        <ColorMatrix matrix={matrix} />
      </Paint>
      <Image
        layer={matrixRef}
        x={0}
        y={0}
        width={width}
        height={height / 2}
        image={image}
        fit="cover"
      />
    </>
  );
};
