import { normalize } from '../common/helpers/responsive';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS, FONT_SIZE, letterSpacing } from '../theme';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.todoApp}>To-Do App</Text>
        <Icon
          name="search"
          style={{ fontSize: FONT_SIZE.normal, color: COLORS.black38 }}
        />
        <View style={{ alignItems: 'flex-end' }}>
          <View style={styles.iconsView} />
          <Icon
            name="bell"
            style={{ fontSize: FONT_SIZE.normal, color: COLORS.black38 }}
          />
        </View>
        <Icon
          name="bars"
          style={{ fontSize: FONT_SIZE.normal, color: COLORS.black38 }}
        />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: normalize(3),
    borderBottomColor: COLORS.gray,
    height: normalize(70),
    justifyContent: 'flex-end',
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(10),
  },
  view: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  todoApp: {
    color: COLORS.black87,
    fontSize: FONT_SIZE.large,
    fontWeight: '700',
    letterSpacing: letterSpacing,
    width: normalize(120),
  },
  iconsView: {
    backgroundColor: '#26c16f',
    borderRadius: normalize(2.5),
    height: normalize(6),
    right: normalize(3),
    top: normalize(3),
    position: 'absolute',
    width: normalize(6),
  },
});
