import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS, FONT_SIZE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';

type AddTaskHeader = NativeStackNavigationProp<
  RootStackParamList,
  'AddTaskScreen'
>;

type Props = {
  navigation: AddTaskHeader;
};

const AddTaskHeader = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Icon
          name="chevron-left"
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.addTask}>Add task</Text>
      </View>
    </View>
  );
};

export default AddTaskHeader;

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
    // borderWidth: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  icon: {
    // borderWidth: 1,
    color: COLORS.black38,
    fontSize: FONT_SIZE.small,
    height: SCREEN_HEIGHT * 0.03,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: SCREEN_HEIGHT * 0.03,
  },

  addTask: {
    // borderWidth: 1,
    color: COLORS.black87,
    fontSize: FONT_SIZE.large,
    fontWeight: '700',
    letterSpacing: SCREEN_WIDTH * 0.0009,
    marginLeft: SCREEN_WIDTH * 0.05,
    width: SCREEN_WIDTH * 0.45,
  },
});
