import React, { Suspense } from 'react';
import { LogBox, StyleSheet } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigation } from './app/navigation/root';
LogBox.ignoreAllLogs();

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export const MyApp = () => {
  // render
  return (
    <SafeAreaProvider>
      <Suspense fallback={null}>
        <GestureHandlerRootView style={styles.root}>
          <RootNavigation />
        </GestureHandlerRootView>
      </Suspense>
    </SafeAreaProvider>
  );
};
