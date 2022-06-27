export enum APP_SCREEN {
  HOME = 'HOME',
  CARD_ROTATE = 'CARD_ROTATE',
}

export type RootStackParamList = {
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.CARD_ROTATE]: undefined;
};
