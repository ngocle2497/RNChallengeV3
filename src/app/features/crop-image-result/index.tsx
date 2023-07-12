import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

import { Canvas, Image } from '@shopify/react-native-skia';

import { APP_SCREEN, StackScreenProps } from '../../navigation/screen-type';

export const CropImageResult = ({
  route: {
    params: { image, width, height },
  },
}: StackScreenProps<APP_SCREEN.CROP_IMAGE_RESULT>) => {
  // state
  const screenWidth = useWindowDimensions().width;

  // render
  return (
    <Canvas style={styles.canvas}>
      <Image
        width={width}
        height={height}
        x={(screenWidth - width) / 2}
        y={10}
        image={image}
      />
    </Canvas>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: '#000',
  },
});
