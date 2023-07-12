import React from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  View,
} from 'react-native';

import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import { Canvas, useCanvasRef, useImage } from '@shopify/react-native-skia';

import { Background } from './components/background';
import { FilterImage } from './components/filter-image';
import { FILTER_ARRAY, SPACER_LIST } from './constants';
import { styles } from './styles';

import { images } from '../../assets/images';

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<string>>(FlatList);

export const ColorFilter = () => {
  // state
  const image = useImage(images.cat);

  const scrollX = useSharedValue(0);

  const scrollXSkia = useDerivedValue(() => scrollX.value + SPACER_LIST);

  const canvas = useCanvasRef();

  // func
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { x } }) => {
      scrollX.value = x;
    },
  });

  const renderItem = ({ index, item }: ListRenderItemInfo<string>) => {
    return (
      <FilterImage image={image!} index={index} item={item} scrollX={scrollX} />
    );
  };

  const keyExtractor = (_item: string, index: number) => {
    return String(index);
  };

  const renderSpacer = () => {
    return <View style={styles.spacer} />;
  };

  // render
  return (
    <View style={styles.container}>
      <Canvas ref={canvas} style={styles.container}>
        <Background scrollX={scrollXSkia} />
      </Canvas>
      <View style={styles.container}>
        <AnimatedFlatList
          onScroll={onScroll}
          scrollEventThrottle={16}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          ItemSeparatorComponent={renderSpacer}
          data={FILTER_ARRAY}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.listWrapper}
        />
      </View>
    </View>
  );
};
