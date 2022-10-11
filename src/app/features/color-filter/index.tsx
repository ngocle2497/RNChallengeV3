import React from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';

import { Canvas } from '@shopify/react-native-skia';

import { Background } from './components/background';
import { FilterImage } from './components/filter-image';
import { styles } from './styles';

export const ColorFilter = () => {
  // func
  const renderItem = ({ index }: ListRenderItemInfo<number>) => {
    return <FilterImage index={index} />;
  };

  const renderSpacer = () => {
    return <View style={styles.spacer} />;
  };

  // render
  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Background />
      </Canvas>
      <View style={styles.container}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          ItemSeparatorComponent={renderSpacer}
          data={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
          renderItem={renderItem}
          contentContainerStyle={styles.listWrapper}
        />
      </View>
    </View>
  );
};
