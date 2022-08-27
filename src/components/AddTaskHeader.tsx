import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS, FONT_SIZE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { normalize } from '../common/helpers/responsive';

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
  },
  icon: {
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
