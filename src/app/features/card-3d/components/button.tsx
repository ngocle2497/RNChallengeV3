import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../styles';
import { ButtonProps } from '../type';

export const Button = ({ text, onPress }: ButtonProps) => {
  // render
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.textButton}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};
