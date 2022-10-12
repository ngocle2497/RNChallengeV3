import React from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  View,
} from 'react-native';

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import {
  Canvas,
  useCanvasRef,
  useSharedValueEffect,
  useValue,
} from '@shopify/react-native-skia';

import { Background } from './components/background';
import { FilterImage } from './components/filter-image';
import { FILTER_ARRAY, SPACER_LIST } from './constants';
import { styles } from './styles';

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<string>>(FlatList);

export const ColorFilter = () => {
  // state
  const scrollX = useSharedValue(0);
  const scrollXSkia = useValue(0);
  const canvas = useCanvasRef();
  // func
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { x } }) => {
      scrollX.value = x;
    },
  });

  const renderItem = ({ index, item }: ListRenderItemInfo<string>) => {
    return <FilterImage index={index} item={item} scrollX={scrollX} />;
  };

  const keyExtractor = (_item: string, index: number) => {
    return String(index);
  };

  const renderSpacer = () => {
    return <View style={styles.spacer} />;
  };

  const updateCanvas = () => {
    // Skia not update matrix value automatic. force update when matrix change
    canvas.current?.redraw();
  };

  // effect
  useSharedValueEffect(() => {
    scrollXSkia.current = scrollX.value + SPACER_LIST;
  }, scrollX);

  // render
  return (
    <View style={styles.container}>
      <Canvas ref={canvas} style={styles.container}>
        <Background scrollX={scrollXSkia} updateCanvas={updateCanvas} />
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
