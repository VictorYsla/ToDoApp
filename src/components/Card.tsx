import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../theme';

type Props = {
  children: ReactNode;
};

const Card = ({ children }: Props) => {
  return <View style={styles.container}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SCREEN_HEIGHT * 0.03,
    height: '97%',
    width: '90%',
    elevation: SCREEN_HEIGHT * 0.03,
    shadowOffset: { height: 1, width: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
  },
});
