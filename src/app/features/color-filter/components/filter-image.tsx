import React from 'react';
import { View } from 'react-native';

import {
  Canvas,
  ColorMatrix,
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
  R1_OUTPUT_RANGE,
  R2_OUTPUT_RANGE,
  R3_OUTPUT_RANGE,
  R4_OUTPUT_RANGE,
  R5_OUTPUT_RANGE,
  SIZE_LIST,
} from '../constants';
import { styles } from '../styles';
import { FilterImageProps } from '../type';

export const FilterImage = ({ index }: FilterImageProps) => {
  // state
  const image = useImage(images.cat);
  if (!image) {
    return null;
  }
  // render
  return (
    <View style={styles.item}>
      <Canvas style={[styles.container]}>
        <Image
          x={0}
          y={0}
          width={SIZE_LIST}
          height={SIZE_LIST}
          image={image}
          fit="cover">
          <ColorMatrix
            matrix={[
              R1_OUTPUT_RANGE[index],
              R2_OUTPUT_RANGE[index],
              R3_OUTPUT_RANGE[index],
              R4_OUTPUT_RANGE[index],
              R5_OUTPUT_RANGE[index],

              G1_OUTPUT_RANGE[index],
              G2_OUTPUT_RANGE[index],
              G3_OUTPUT_RANGE[index],
              G4_OUTPUT_RANGE[index],
              G5_OUTPUT_RANGE[index],

              B1_OUTPUT_RANGE[index],
              B2_OUTPUT_RANGE[index],
              B3_OUTPUT_RANGE[index],
              B4_OUTPUT_RANGE[index],
              B5_OUTPUT_RANGE[index],

              A1_OUTPUT_RANGE[index],
              A2_OUTPUT_RANGE[index],
              A3_OUTPUT_RANGE[index],
              A4_OUTPUT_RANGE[index],
              A5_OUTPUT_RANGE[index],
            ]}
          />
        </Image>
      </Canvas>
    </View>
  );
};
