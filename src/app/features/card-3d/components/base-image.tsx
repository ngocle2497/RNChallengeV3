import React from 'react';

import FastImage from 'react-native-fast-image';

import { images } from '../../../assets/images';
import { styles } from '../styles';

export const BaseImage = () => {
  // render
  return (
    <FastImage
      resizeMode="cover"
      style={[styles.image]}
      source={images.iphone14}
    />
  );
};
