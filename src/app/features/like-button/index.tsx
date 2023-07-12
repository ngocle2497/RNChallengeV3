import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import { styles } from './styles';

export const LikeButton = () => {
  // state
  const [liked, setLiked] = useState<boolean>(false);

  const progress = useDerivedValue(() =>
    withTiming(liked ? 1 : 0, { duration: 500 }),
  );

  const likeOpacity = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [1, 0]),
  );

  const heartOpacity = useDerivedValue(() =>
    interpolate(progress.value, [0, 0.5], [0, 1]),
  );

  const translateXLeftHeart = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [-200, 0]),
  );

  const rotateLeftHeart = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [-720, 30]),
  );

  const translateXRightHeart = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [200, 0]),
  );

  const rotateRightHeart = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [720 + 180, 150]),
  );

  const likedOpacity = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [0, 1]),
  );

  const backgroundColor = useDerivedValue(() =>
    interpolateColor(progress.value, [0, 1], ['#fff', 'transparent']),
  );

  // func
  const handleToggleLike = () => {
    setLiked(v => !v);
  };

  // restyle
  const likeStyle = useAnimatedStyle(() => ({
    opacity: likeOpacity.value,
  }));

  const likedStyle = useAnimatedStyle(() => ({
    opacity: likedOpacity.value,
  }));

  const backgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));

  const leftHeartStyle = useAnimatedStyle(() => ({
    opacity: heartOpacity.value,
    transform: [
      { translateX: translateXLeftHeart.value },
      { rotate: `${rotateLeftHeart.value}deg` },
    ],
  }));

  const rightHeartStyle = useAnimatedStyle(() => ({
    opacity: heartOpacity.value,
    transform: [
      { translateX: translateXRightHeart.value },
      { rotate: `${rotateRightHeart.value}deg` },
    ],
  }));

  // render
  return (
    <View style={styles.root}>
      <TouchableOpacity activeOpacity={1} onPress={handleToggleLike}>
        <Animated.View style={[styles.button, backgroundStyle]}>
          <Animated.View style={[styles.leftHeart, leftHeartStyle]} />
          <Animated.View style={[styles.rightHeart, rightHeartStyle]} />
          <Animated.View style={likeStyle}>
            <Text style={styles.text}>LIKE</Text>
          </Animated.View>
          <Animated.View style={[styles.wrapTextLiked, likedStyle]}>
            <Text style={[styles.text, styles.textLiked]}>LIKED</Text>
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};
