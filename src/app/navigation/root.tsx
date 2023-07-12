import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import Splash from 'react-native-bootsplash';

import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { navigationRef } from './navigation-service';
import { APP_SCREEN, RootStackParamList } from './screen-type';

import { ADN } from '../features/adn';
import { Card3D } from '../features/card-3d';
import { CardGradient } from '../features/card-gradient';
import { CardRotate } from '../features/card-rotate';
import { ColorFilter } from '../features/color-filter';
import { CropImage } from '../features/crop-image';
import { CropImageResult } from '../features/crop-image-result';
import { DarkLightMode } from '../features/dark-light-mode';
import { DotsAnimation } from '../features/dots-animation';
import { GestureFunction } from '../features/gesture-function';
import { GridRotate } from '../features/grid-rotate';
import { Home } from '../features/home';
import { IconMaskTransition } from '../features/icon-mask-transition';
import { InfinityDot } from '../features/infinity-dot';
import { IosAppOpen } from '../features/ios-app-open';
import { LikeButton } from '../features/like-button';
import { LineChart } from '../features/line-chart';
import { LineGraph } from '../features/line-graph';
import { MountedElement } from '../features/mounted-element';
import { PieChart } from '../features/pie-chart';
import { RefreshIsland } from '../features/refresh-island';
import { ScratchTicket } from '../features/scratch-tickets';
import { SensorWallpaper } from '../features/sensor-wallpaper';
import { SoundWave } from '../features/sound-wave';
import { SpaceButton } from '../features/space-button';
import { SwipeSort } from '../features/swipe-sort';
import { TelegramLock } from '../features/telegram-lock';
import { TiktokRemix } from '../features/tiktok-remix';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  // effect
  useEffect(() => {
    const id = setTimeout(() => {
      Splash.hide().then(() => {
        setTimeout(() => {
          StatusBar.pushStackEntry({
            barStyle: 'dark-content',
            backgroundColor: 'transparent',
            translucent: true,
          });
        }, 100);
      });
    }, 200);

    return () => clearTimeout(id);
  }, []);

  // render
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      <RootStack.Navigator
        // initialRouteName={APP_SCREEN.SOUND_WAVE}
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          headerTitleAlign: 'center',
        }}>
        <RootStack.Screen
          options={{ title: 'Home' }}
          name={APP_SCREEN.HOME}
          component={Home}
        />
        <RootStack.Screen
          options={{ title: 'Card Rotate' }}
          name={APP_SCREEN.CARD_ROTATE}
          component={CardRotate}
        />
        <RootStack.Screen
          options={{ title: 'Space Button' }}
          name={APP_SCREEN.SPACE_BUTTON}
          component={SpaceButton}
        />
        <RootStack.Screen
          options={{ title: 'Card Gradient' }}
          name={APP_SCREEN.CARD_GRADIENT}
          component={CardGradient}
        />
        <RootStack.Screen
          options={{ title: 'Mounted Element' }}
          name={APP_SCREEN.MOUNTED_ELEMENT}
          component={MountedElement}
        />
        <RootStack.Screen
          options={{ title: 'Sensor Wallpaper' }}
          name={APP_SCREEN.SENSOR_WALLPAPER}
          component={SensorWallpaper}
        />
        <RootStack.Screen
          options={{ title: 'Swipe Sort' }}
          name={APP_SCREEN.SWIPE_SORT}
          component={SwipeSort}
        />
        <RootStack.Screen
          options={{ title: 'Card 3D' }}
          name={APP_SCREEN.CARD_3D}
          component={Card3D}
        />
        <RootStack.Screen
          options={{ title: 'Refresh Island' }}
          name={APP_SCREEN.REFRESH_ISLAND}
          component={RefreshIsland}
        />
        <RootStack.Screen
          options={{ title: 'Color Filter' }}
          name={APP_SCREEN.COLOR_FILTER}
          component={ColorFilter}
        />
        <RootStack.Screen
          options={{ title: 'Scratch Ticket' }}
          name={APP_SCREEN.SCRATCH_TICKET}
          component={ScratchTicket}
        />
        <RootStack.Screen
          options={{ title: 'Telegram Lock', headerShown: false }}
          name={APP_SCREEN.TELEGRAM_LOCK}
          component={TelegramLock}
        />
        <RootStack.Screen
          options={{ title: 'Icon Mask Transition', headerShown: false }}
          name={APP_SCREEN.ICON_MASK_TRANSITION}
          component={IconMaskTransition}
        />
        <RootStack.Screen
          options={{ title: 'Like Button', headerShown: false }}
          name={APP_SCREEN.LIKE_BUTTON}
          component={LikeButton}
        />
        <RootStack.Screen
          options={{ title: 'Infinity Dot', headerShown: false }}
          name={APP_SCREEN.INFINITY_DOT}
          component={InfinityDot}
        />
        <RootStack.Screen
          options={{ title: 'Line Chart' }}
          name={APP_SCREEN.LINE_CHART}
          component={LineChart}
        />
        <RootStack.Screen
          options={{ title: 'Pie Chart' }}
          name={APP_SCREEN.PIE_CHART}
          component={PieChart}
        />
        <RootStack.Screen
          options={{ title: 'Tiktok remix', headerShown: false }}
          name={APP_SCREEN.TIKTOK_REMIX}
          component={TiktokRemix}
        />
        <RootStack.Screen
          options={{ title: 'ADN', headerShown: false }}
          name={APP_SCREEN.ADN}
          component={ADN}
        />
        <RootStack.Screen
          options={{ title: 'Dark Light Mode', headerShown: false }}
          name={APP_SCREEN.DARK_LIGHT_MODE}
          component={DarkLightMode}
        />
        <RootStack.Screen
          options={{ title: 'Grid Rotate', headerShown: false }}
          name={APP_SCREEN.GRID_ROTATE}
          component={GridRotate}
        />
        <RootStack.Screen
          options={{ title: 'Ios App Open', headerShown: false }}
          name={APP_SCREEN.IOS_APP_OPEN}
          component={IosAppOpen}
        />
        <RootStack.Screen
          options={{ title: 'Dots Animation', headerShown: false }}
          name={APP_SCREEN.DOTS_ANIMATION}
          component={DotsAnimation}
        />
        <RootStack.Screen
          options={{ title: 'Line Graph', gestureEnabled: false }}
          name={APP_SCREEN.LINE_GRAPH}
          component={LineGraph}
        />
        <RootStack.Screen
          options={{ title: 'Gesture Function', gestureEnabled: false }}
          name={APP_SCREEN.GESTURE_FUNCTION}
          component={GestureFunction}
        />
        <RootStack.Screen
          options={{ title: 'Crop Image', gestureEnabled: false }}
          name={APP_SCREEN.CROP_IMAGE}
          component={CropImage}
        />
        <RootStack.Screen
          options={{
            title: 'Crop Image Result',
            gestureEnabled: false,
            ...TransitionPresets.ModalPresentationIOS,
          }}
          name={APP_SCREEN.CROP_IMAGE_RESULT}
          component={CropImageResult}
        />
        <RootStack.Screen
          options={{
            title: 'Sound Wave',
            gestureEnabled: false,
          }}
          name={APP_SCREEN.SOUND_WAVE}
          component={SoundWave}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
