import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import { icons } from '../icons';
import { styles } from '../styles';
import { IconButtonProps } from '../type';

export const IconButton = ({ icon, onPress }: IconButtonProps) => {
  // render
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.iconButton}>
        <FastImage
          tintColor={'#ffffff'}
          source={icons[icon]}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    </TouchableOpacity>
  );
};
