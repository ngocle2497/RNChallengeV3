import React, { useCallback, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import Animated from 'react-native-reanimated';

import { ItemBox } from './components/item-box';
import { randomBox } from './constant';
import { styles } from './styles';
import { Box } from './type';

export const MountedElement = () => {
  // state
  const [data, setData] = useState<Array<Box>>([]);

  // func
  const handlePush = () => {
    setData(x => x.concat(randomBox()));
  };

  const handlePop = () => {
    setData(x => x.slice(0, x.length - 1));
  };

  // func
  const renderBox = useCallback((item: Box) => {
    return <ItemBox box={item} key={item.id} />;
  }, []);

  // render
  return (
    <Animated.View style={[styles.root]}>
      <ScrollView>
        <View style={[styles.rowButton]}>
          <TouchableOpacity onPress={handlePop}>
            <View style={[styles.button]}>
              <Text style={[styles.textButton]}>Pop</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePush}>
            <View style={[styles.button]}>
              <Text style={[styles.textButton]}>Push</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.rowChildren]}>{data.map(renderBox)}</View>
      </ScrollView>
    </Animated.View>
  );
};
