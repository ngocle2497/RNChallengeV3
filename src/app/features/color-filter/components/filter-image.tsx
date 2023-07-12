import React from 'react';
import { Text, View } from 'react-native';

import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import { Canvas, ColorMatrix, Image } from '@shopify/react-native-skia';

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
  SIZE_ITEM,
  SPACER_LIST,
} from '../constants';
import { styles } from '../styles';
import { FilterImageProps } from '../type';

export const FilterImage = ({
  index,
  item,
  scrollX,
  image,
}: FilterImageProps) => {
  // state
  const inputRange = useDerivedValue(() => {
    const sizeItem = SIZE_ITEM + SPACER_LIST;

    return [(index - 1) * sizeItem, index * sizeItem, (index + 1) * sizeItem];
  }, []);

  const opacity = useDerivedValue(() => {
    return interpolate(scrollX.value, inputRange.value, [0.6, 1, 0.6]);
  });

  const translateY = useDerivedValue(() => {
    return interpolate(scrollX.value, inputRange.value, [30, 0, 30]);
  });

  const itemRestyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!image) {
    return null;
  }

  // render
  return (
    <Animated.View style={[styles.item, itemRestyle]}>
      <Canvas style={[styles.container]}>
        <Image
          x={0}
          y={0}
          width={SIZE_ITEM}
          height={SIZE_ITEM}
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
      <View style={styles.textWrapper}>
        <Text style={styles.textItem}>{item}</Text>
      </View>
    </Animated.View>
  );
};
