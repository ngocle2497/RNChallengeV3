import {
  Blur,
  BlurMask,
  Canvas,
  Circle,
  Group,
  Mask,
  Path,
  Rect,
  RoundedRect,
  SweepGradient,
  vec,
} from '@shopify/react-native-skia';
import React, {useEffect, useState} from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BAR_LENGTH,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  ORIGIN_GROUP,
  SIZE_BALL,
  WRAP_BALL,
} from './constant';
import {Bar} from './components/bar';
import {
  Extrapolate,
  interpolate,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {RNSound} = NativeModules;

const deg2rad = (deg: number) => {
  'worklet';

  return (deg * Math.PI) / 180;
};

export const SoundWave = () => {
  // state
  const [ended, setEnded] = useState(false);
  const data = useSharedValue(Array.from({length: BAR_LENGTH}).map(() => 0));

  const bass = useDerivedValue(() => {
    return data.value.slice(0, 10).reduce((acc, cur) => acc + cur, 0) / 10;
  });

  const blur = useDerivedValue(() =>
    interpolate(bass.value, [0, 100], [1, 8], Extrapolate.CLAMP),
  );

  const rotate = useDerivedValue(() => {
    const nextRotate = deg2rad(interpolate(bass.value, [0, 45], [4, 360]));
    return withTiming(nextRotate, {duration: 80});
  });

  const scale = useDerivedValue(() => {
    return withTiming(
      interpolate(
        bass.value,
        [0, 100],
        [0.8, WRAP_BALL / SIZE_BALL],
        Extrapolate.CLAMP,
      ),
      {duration: 80},
    );
  });

  const transform = useDerivedValue(() => {
    return [
      {
        rotate: rotate.value,
      },
      {scale: scale.value},
    ];
  });

  // func
  const handlePlay = () => {
    RNSound.play();
  };

  const handlePause = () => {
    RNSound.pause();
  };

  const handleRestart = () => {
    RNSound.restart();
  };

  const renderBar = (_: any, index: number) => {
    return <Bar index={index} data={data} />;
  };

  // effect

  useEffect(() => {
    RNSound.prepare(BAR_LENGTH);
    const unSubscribe = new NativeEventEmitter(RNSound).addListener(
      'AudioProcessing',
      _data => {
        data.value = _data;
      },
    );
    const unSubscribeOnEnd = new NativeEventEmitter(RNSound).addListener(
      'AudioEnd',
      () => {
        setEnded(true);
      },
    );
    return () => {
      unSubscribe.remove();
      unSubscribeOnEnd.remove();
      RNSound.destroy();
    };
  }, []);

  // render
  return (
    <View style={styles.root}>
      <View style={styles.rowCanvas}>
        <View>
          <Canvas style={styles.canvas}>
            <Group origin={ORIGIN_GROUP}>
              {Array.from({length: BAR_LENGTH}).map(renderBar)}
            </Group>
          </Canvas>
        </View>
        <Canvas style={styles.wrapBall}>
          <Group
            origin={{x: WRAP_BALL / 2, y: WRAP_BALL / 2}}
            transform={transform}>
            <RoundedRect
              r={SIZE_BALL}
              x={(WRAP_BALL - SIZE_BALL) / 2}
              y={(WRAP_BALL - SIZE_BALL) / 2}
              width={SIZE_BALL}
              height={SIZE_BALL}>
              <SweepGradient
                c={vec(WRAP_BALL / 2, WRAP_BALL / 2)}
                colors={[
                  '#00a8ff',
                  '#9c88ff',
                  '#fbc531',
                  '#4cd137',
                  '#487eb0',
                  '#00a8ff',
                ]}
              />
              <BlurMask blur={blur} style="inner" />
            </RoundedRect>
          </Group>
        </Canvas>
        <View style={styles.wrapRight}>
          <Canvas style={styles.canvas}>
            <Group origin={ORIGIN_GROUP}>
              {Array.from({length: BAR_LENGTH}).map(renderBar)}
            </Group>
          </Canvas>
        </View>
      </View>
      <View style={styles.rowFunc}>
        <TouchableOpacity style={styles.button} onPress={handlePlay}>
          <Text style={styles.textButton}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePause}>
          <Text style={styles.textButton}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRestart}>
          <Text style={styles.textButton}>Restart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black',
  },
  canvas: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  },
  rowCanvas: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapBall: {
    width: WRAP_BALL,
    height: WRAP_BALL,
  },
  wrapRight: {
    transform: [{rotateY: '180deg'}],
  },
  rowFunc: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textButton: {
    fontWeight: 'bold',
  },
});
