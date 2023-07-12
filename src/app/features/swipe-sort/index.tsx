import React from 'react';
import { View } from 'react-native';

import { useSharedValue } from 'react-native-reanimated';

import { ItemImage } from './components/item-image';
import { arrayToObjectZIndex } from './constants';
import { listImage } from './data';
import { styles } from './styles';
import { Image } from './type';

export const SwipeSort = () => {
  // state
  const positions = useSharedValue(arrayToObjectZIndex(listImage));

  console.log(arrayToObjectZIndex(listImage));

  // func
  const renderImage = (item: Image) => {
    return <ItemImage key={item.id} image={item} positions={positions} />;
  };

  // render
  return <View style={[styles.container]}>{listImage.map(renderImage)}</View>;
};
