import React from 'react';

import {Image} from 'expo-image';

import {images} from '../../../assets/images';
import {styles} from '../styles';

export const BaseImage = () => {
  // render
  return (
    <Image contentFit="cover" style={[styles.image]} source={images.iphone14} />
  );
};
