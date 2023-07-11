import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';

import {useSharedValue} from 'react-native-reanimated';
import Video from 'react-native-video';

import {Canvas, Mask, useImage} from '@shopify/react-native-skia';
import {AnimatedMask} from './components/animated-mask';
import {MaskView} from './components/mask-view';
import {OriginImage} from './components/origin-image';
import {OverlayMask} from './components/overlay-mask';
import {styles} from './styles';

export const TiktokRemix = () => {
  // state
  const image1 = useImage(require('./files/image1.jpeg'));
  const image2 = useImage(require('./files/image2.jpeg'));
  const image3 = useImage(require('./files/image3.jpeg'));

  const progress = useSharedValue(0);
  const scaleMask = useSharedValue(1.2);
  const maskRef = useRef<AnimatedMask>(null);

  // render
  if (!image1 || !image2 || !image3) return <></>;
  return (
    <View style={styles.root}>
      <Video
        onProgress={v => {
          if (v.currentTime === 0) {
            progress.value = 0;
            maskRef.current?.run();
          }
        }}
        repeat
        paused={false}
        playInBackground
        source={require('./files/tiktok.mp4')}
        style={[StyleSheet.absoluteFillObject, {opacity: 0}]}
      />
      <Canvas style={styles.canvas}>
        <OverlayMask image={image2} scaleMask={scaleMask} />
        <Mask
          mask={
            <AnimatedMask
              progress={progress}
              scaleMask={scaleMask}
              ref={maskRef}
            />
          }>
          <MaskView image={image1} />
        </Mask>
        <OriginImage image={image3} progress={progress} />
      </Canvas>
    </View>
  );
};
