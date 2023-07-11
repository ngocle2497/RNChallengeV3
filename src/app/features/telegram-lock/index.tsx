import React from 'react';
import { TextInput, View } from 'react-native';

import { runTiming, useValue } from '@shopify/react-native-skia';

import { Overlay } from './components/overlay';
import { styles } from './styles';

export const TelegramLock = () => {
  // state
  const progressSkia = useValue(0);

  // func
  const onChangeText = () => {
    runTiming(progressSkia, progressSkia.current + 1, { duration: 200 });
  };

  // render
  return (
    <>
      <Overlay progressSkia={progressSkia} />
      <View style={styles.container}>
        <View style={styles.wrapInput}>
          <TextInput
            placeholder="Enter your passcode"
            placeholderTextColor={'#ffffff'}
            onChangeText={onChangeText}
            style={styles.input}
            selectionColor={'#ffffff'}
            secureTextEntry
          />
        </View>
      </View>
    </>
  );
};
