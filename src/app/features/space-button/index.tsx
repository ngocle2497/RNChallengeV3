import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

import {Image} from 'expo-image';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import {LightRay} from './components/light-ray';
import {URL_SPACE} from './constant';
import {styles} from './styles';

export const SpaceButton = () => {
  // state
  const [going, setGoing] = useState<boolean>(false);
  const scale = useSharedValue(1);

  // func
  const handleToggleGoing = () => {
    setGoing(v => !v);
  };

  const bgStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const renderItem = useCallback((_: any, index: number) => {
    return <LightRay index={index} total={30} key={index} />;
  }, []);

  // effect
  useEffect(() => {
    if (going) {
      scale.value = withRepeat(
        withTiming(3, {duration: 200 * 1000, easing: Easing.linear}),
        -1,
        true,
      );
    } else {
      scale.value = 1;
    }
  }, [going]);

  // render
  return (
    <>
      <Animated.View style={[StyleSheet.absoluteFillObject, bgStyle]}>
        <Image
          pointerEvents="none"
          source={{uri: URL_SPACE}}
          contentFit="cover"
          style={[StyleSheet.absoluteFillObject]}
        />
      </Animated.View>
      <View style={[styles.background]}>
        {going ? Array(50).fill(0).map(renderItem) : null}
        <TouchableWithoutFeedback onPress={handleToggleGoing}>
          <View style={[styles.button]}>
            <Text style={{color: '#ffffff'}}>{going ? 'Stop' : 'Start'}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};
