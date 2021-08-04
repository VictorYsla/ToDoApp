import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS, FONT_SIZE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../theme';

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
    borderBottomWidth: SCREEN_WIDTH * 0.005,
    borderBottomColor: COLORS.gray,
    height: SCREEN_HEIGHT * 0.1,
    justifyContent: 'flex-end',
    paddingHorizontal: SCREEN_WIDTH * 0.1,
    paddingBottom: SCREEN_HEIGHT * 0.01,
  },
  view: {
    alignItems: 'center',
    //   borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  todoApp: {
    // borderWidth: 1,
    color: COLORS.black87,
    fontSize: FONT_SIZE.large,
    fontWeight: '700',
    letterSpacing: SCREEN_WIDTH * 0.0009,
    width: SCREEN_WIDTH * 0.45,
  },
  iconsView: {
    // borderWidth: 1,
    backgroundColor: '#26c16f',
    borderRadius: SCREEN_HEIGHT * 0.0025,
    height: SCREEN_HEIGHT * 0.006,
    right: SCREEN_WIDTH * 0.003,
    top: SCREEN_WIDTH * 0.003,
    position: 'absolute',
    width: SCREEN_HEIGHT * 0.006,
  },
});
