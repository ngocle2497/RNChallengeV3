import {
  Canvas as SKCanvas,
  Image,
  Rect,
  useCanvasRef,
  useImage,
} from '@shopify/react-native-skia';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {sharedClamp} from '../../constants';
import {navigate} from '../../navigation/navigation-service';
import {APP_SCREEN} from '../../navigation/screen-type';
import {DotGesture} from './components/dot-gesture';
import {CALCULATED_IMAGE_HEIGHT, CALCULATED_IMAGE_WIDTH} from './constants';
import {useGesture} from './hooks';
import {Grid} from './components/grid';
import {Image as EXImage} from 'expo-image';

const Canvas = Animated.createAnimatedComponent(SKCanvas);

export const CropImage = () => {
  // state
  const x1 = useSharedValue(0);
  const y1 = useSharedValue(0);

  const x2 = useSharedValue(CALCULATED_IMAGE_WIDTH);
  const y2 = useSharedValue(CALCULATED_IMAGE_HEIGHT);
  const {
    bottomLeftGesture,
    bottomRightGesture,
    topLeftGesture,
    topRightGesture,
    gridGesture,
  } = useGesture({
    x1,
    x2,
    y1,
    y2,
  });

  const canvasRef = useCanvasRef();
  const image = useImage(require('./image/food.jpg'));

  // point topLeft
  const xTopLeft = useDerivedValue(() =>
    sharedClamp(x1.value, 0, CALCULATED_IMAGE_WIDTH),
  );

  const yTopLeft = useDerivedValue(() =>
    sharedClamp(y1.value, 0, CALCULATED_IMAGE_HEIGHT),
  );

  // point topRight
  const xTopRight = useDerivedValue(() =>
    sharedClamp(x2.value, 0, CALCULATED_IMAGE_WIDTH),
  );

  const yTopRight = useDerivedValue(() =>
    sharedClamp(y1.value, 0, CALCULATED_IMAGE_HEIGHT),
  );

  // point bottomLeft

  const xBottomLeft = useDerivedValue(() =>
    sharedClamp(x1.value, 0, CALCULATED_IMAGE_WIDTH),
  );
  const yBottomLeft = useDerivedValue(() =>
    sharedClamp(y2.value, 0, CALCULATED_IMAGE_HEIGHT),
  );

  // point bottomRight
  const xBottomRight = useDerivedValue(() =>
    sharedClamp(x2.value, 0, CALCULATED_IMAGE_WIDTH),
  );
  const yBottomRight = useDerivedValue(() =>
    sharedClamp(y2.value, 0, CALCULATED_IMAGE_HEIGHT),
  );

  const widthRect = useDerivedValue(() => Math.abs(x1.value - x2.value));

  // func
  const handleCropImage = async () => {
    const width = widthRect.value;

    const image = canvasRef.current?.makeImageSnapshot();
    if (image) {
      navigate(APP_SCREEN.CROP_IMAGE_RESULT, {
        image,
        width,
        height: Math.abs(y1.value - y2.value),
      });
    }
  };

  const handleExplain = () => {
    x1.value = withTiming(0);
    y1.value = withTiming(0);
    x2.value = withTiming(CALCULATED_IMAGE_WIDTH);
    y2.value = withTiming(CALCULATED_IMAGE_HEIGHT);
  };

  const gridTop = useDerivedValue(() =>
    Math.min(y1.value, y2.value) < 0 ? 0 : Math.min(y1.value, y2.value),
  );

  const gridLeft = useDerivedValue(() =>
    Math.min(x1.value, x2.value) < 0 ? 0 : Math.min(x1.value, x2.value),
  );

  const gridRight = useDerivedValue(() =>
    CALCULATED_IMAGE_WIDTH - Math.max(x1.value, x2.value) < 0
      ? 0
      : CALCULATED_IMAGE_WIDTH - Math.max(x1.value, x2.value),
  );

  const gridBottom = useDerivedValue(() =>
    CALCULATED_IMAGE_HEIGHT - Math.max(y1.value, y2.value) < 0
      ? 0
      : CALCULATED_IMAGE_HEIGHT - Math.max(y1.value, y2.value),
  );

  const widthCanvas = useDerivedValue(
    () => CALCULATED_IMAGE_WIDTH - (gridLeft.value + gridRight.value),
  );
  const heightCanvas = useDerivedValue(
    () => CALCULATED_IMAGE_HEIGHT - (gridTop.value + gridBottom.value),
  );
  const leftImage = useDerivedValue(() => -gridLeft.value);
  const topImage = useDerivedValue(() => -gridTop.value);

  const canvasStyle = useAnimatedStyle(() => ({
    top: gridTop.value,
    left: gridLeft.value,
    opacity: 0,
    width: widthCanvas.value,
    height: heightCanvas.value,
  }));

  // render
  return (
    <View style={[styles.root]}>
      <View style={styles.wrapImage}>
        <EXImage
          contentFit="cover"
          style={StyleSheet.absoluteFillObject}
          source={require('./image/food.jpg')}
        />
        <Canvas ref={canvasRef} style={canvasStyle}>
          <Image
            fit={'cover'}
            image={image}
            x={leftImage}
            y={topImage}
            width={CALCULATED_IMAGE_WIDTH}
            height={CALCULATED_IMAGE_HEIGHT}
          />
        </Canvas>

        <Grid
          gesture={gridGesture}
          left={gridLeft}
          top={gridTop}
          right={gridRight}
          bottom={gridBottom}
        />
        <DotGesture left={xTopLeft} top={yTopLeft} gesture={topLeftGesture} />
        <DotGesture
          left={xTopRight}
          top={yTopRight}
          gesture={topRightGesture}
        />
        <DotGesture
          left={xBottomLeft}
          top={yBottomLeft}
          gesture={bottomLeftGesture}
        />
        <DotGesture
          left={xBottomRight}
          top={yBottomRight}
          gesture={bottomRightGesture}
        />
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={handleCropImage}>
          <View style={styles.button}>
            <Text style={styles.textButton}>Crop</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleExplain}>
          <View style={styles.button}>
            <Text style={styles.textButton}>Explain</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    width: CALCULATED_IMAGE_WIDTH,
    height: CALCULATED_IMAGE_HEIGHT,
    opacity: 0,
  },
  root: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapImage: {
    width: CALCULATED_IMAGE_WIDTH,
    height: CALCULATED_IMAGE_HEIGHT,
  },
  textButton: {
    color: '#fff',
    fontSize: 20,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});
