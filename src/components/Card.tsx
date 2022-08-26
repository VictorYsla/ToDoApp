import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../theme';
import { normalize } from '../common/helpers/responsive';

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
    borderRadius: normalize(20),
    flex: 1,
    width: '90%',
    elevation: normalize(20),
    shadowOffset: { height: 1, width: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
  },
});
