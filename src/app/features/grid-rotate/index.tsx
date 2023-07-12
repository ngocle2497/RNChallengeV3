import React from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import { ItemGrid } from './components/item-grid';
import { GridProvider } from './constant';
import { styles } from './styles';

export const GridRotate = () => {
  // state
  const scrollY = useSharedValue(0);

  const scale = useDerivedValue(() =>
    interpolate(scrollY.value, [0, 200], [0.85, 1.2]),
  );

  const rotate = useDerivedValue(() =>
    interpolate(scrollY.value, [0, 180], [0, 360], Extrapolate.CLAMP),
  );

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = y;

      console.log({ y });
    },
  });

  // style
  const gridStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }, { scale: scale.value }],
    justifyContent: 'center',
    alignItems: 'center',
  }));

  // render
  return (
    <GridProvider value={{ rotate }}>
      <View style={styles.root}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}>
          <View style={styles.contentScroll} />
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFillObject, gridStyle]}>
          <ItemGrid
            uri="https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
            width={100}
            height={80}
            y={-100}
            x={-85}
          />
          <ItemGrid
            uri="https://images.unsplash.com/photo-1589251204996-3367cc27f084?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1110&q=80"
            width={70}
            height={120}
            y={-120}
            x={0}
          />
          <ItemGrid
            uri="https://images.unsplash.com/photo-1618768153818-fc86c52e972b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            width={80}
            height={100}
            y={-110}
            x={75}
          />
          <ItemGrid
            uri="https://images.unsplash.com/photo-1597589022928-bb4002c099ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
            width={70}
            height={70}
            x={-110}
            y={-25}
          />
          <ItemGrid
            uri="https://images.unsplash.com/photo-1579158951805-53f80485ed44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
            width={100}
            height={50}
            x={-125}
            y={35}
          />
          <ItemGrid
            uri="https://images.unsplash.com/photo-1678069614987-22225d9519bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80"
            width={150}
            height={120}
            x={0}
            y={0}
          />
          <ItemGrid
            uri="https://images.unsplash.com/photo-1634567206025-8854493d5fea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
            width={100}
            height={40}
            x={125}
            y={-40}
          />
          <ItemGrid
            uri="https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1550&q=80"
            width={80}
            height={80}
            x={115}
            y={20}
          />
          <ItemGrid
            uri="https://images.unsplash.com/photo-1636741742569-b1cdb45a6570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80"
            width={50}
            height={80}
            x={-100}
            y={100}
          />
          <ItemGrid
            uri="https://images.unsplash.com/photo-1621432365570-123fb377b8a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            width={70}
            height={130}
            x={-40}
            y={125}
          />
          <ItemGrid
            uri="https://images.unsplash.com/photo-1547924326-032f60c4ada3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            width={100}
            height={90}
            x={45}
            y={105}
          />
        </Animated.View>
      </View>
    </GridProvider>
  );
};
