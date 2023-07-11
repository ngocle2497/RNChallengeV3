import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../styles';
import { ItemFunctionProps } from '../type';

export const ItemFunction = ({ text, onPress }: ItemFunctionProps) => {
  // render
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.item]}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};
