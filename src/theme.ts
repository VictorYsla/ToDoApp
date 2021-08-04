import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const COLORS = {
  primary: 'rgb(41,191,110)',
  primaryDeg: 'rgba(41,191,110,0.5)',
  secondary: '#00def9',
  secondaryDeg: 'rgba(0,30,122,0.4)',
  white: '#FFF',
  dark: '#41007A',
  gray: '#E8E8E8',
  error: '#E0378A',
  black: '#000000',
  black87: 'rgba(0, 0, 0, 0.77)',
  black38: 'rgba(0, 0, 0, 0.38)',
  buttonOpacity: 'rgba(115,39,170, 0.4)',
};

export const FONT_SIZE = {
  small: SCREEN_HEIGHT * 0.016,
  normal: SCREEN_HEIGHT * 0.018,
  large: SCREEN_HEIGHT * 0.022,
};

export const letterSpacing = SCREEN_WIDTH * 0.0009;
