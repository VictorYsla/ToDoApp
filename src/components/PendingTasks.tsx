import React, { Dispatch, PropsWithChildren, useState } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  COLORS,
  FONT_SIZE,
  letterSpacing,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../theme';
import { connect, DispatchProp, Matching } from 'react-redux';
import { actions } from '../contexts/reduxConfig';
import { Action, AnyAction, CombinedState } from 'redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';

type valueProps = {
  create: number;
  title: string;
  deadLine: number;
  startTime: number;
  endtime: number;
  remind: number;
  repeat: string;
  color: string;
};

type PendingTasks = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

type secundaryProps = {
  navigation: PendingTasks;
  dispatch: Dispatch<Action>;
  tasks: [];
  doneTasks: [];
};

type Props = PropsWithChildren<
  Matching<
    {
      tasks: [] | undefined;
      doneTasks: [] | undefined;
    } & DispatchProp<AnyAction>,
    Matching<
      { tasks: [] | undefined } & DispatchProp<AnyAction>,
      secundaryProps
    >
  >
>;

const PendingTasks = ({
  dispatch,
  navigation,
  tasks,
  doneTasks,
  ...props
}: Props) => {
  const doneTask = (value: valueProps) => {
    doneTasks && dispatch(actions.addDoneTask([...doneTasks, value]));
    const currentTask =
      tasks && tasks.filter((item: valueProps) => item.create !== value.create);
    currentTask && dispatch(actions.addTask(currentTask));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pendingtext}>Pending tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.create}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              marginVertical: SCREEN_HEIGHT * 0.009,
            }}
          >
            <Pressable
              style={[styles.pressable, { borderColor: item.color }]}
              onPress={() => doneTask(item)}
            ></Pressable>
            <Text style={styles.textPressable} numberOfLines={1}>
              {item.title}
            </Text>
          </View>
        )}
      />
    </View>
  );
};
type stateProps =
  | CombinedState<{ tasks: { tasks: any }; doneTasks: { doneTasks: any } }>
  | undefined;

const mapStateToProps = (state: stateProps) => {
  const tasks = state?.tasks.tasks;
  const doneTasks = state?.doneTasks.doneTasks;
  return {
    tasks,
    doneTasks,
  };
};
export default connect(mapStateToProps)(PendingTasks);

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    borderColor: 'red',
    height: SCREEN_HEIGHT * 0.38,
    justifyContent: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.1,
    marginVertical: SCREEN_HEIGHT * 0.04,
  },

  pendingtext: {
    // borderWidth: 1,
    color: COLORS.black87,
    fontSize: FONT_SIZE.large,
    fontWeight: '700',
    letterSpacing: letterSpacing,
    width: SCREEN_WIDTH * 0.5,
    marginBottom: SCREEN_HEIGHT * 0.04,
  },

  pressable: {
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: SCREEN_HEIGHT * 0.004,
    height: SCREEN_HEIGHT * 0.02,
    justifyContent: 'center',
    width: SCREEN_HEIGHT * 0.02,
  },

  textPressable: {
    color: COLORS.black87,
    fontSize: FONT_SIZE.small,
    paddingLeft: SCREEN_HEIGHT * 0.012,
    letterSpacing: letterSpacing,
    width: '90%',
  },
});
