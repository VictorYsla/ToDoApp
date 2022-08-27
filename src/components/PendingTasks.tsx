import React, { Dispatch, PropsWithChildren, useState } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
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
import { normalize } from '../common/helpers/responsive';

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
    height: normalize(200),
    justifyContent: 'center',
    marginVertical: normalize(15),
  },

  pendingtext: {
    color: COLORS.black87,
    fontSize: FONT_SIZE.large,
    fontWeight: '700',
    letterSpacing: letterSpacing,
    marginBottom: normalize(10),
  },

  pressable: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: normalize(5),
    height: normalize(20),
    justifyContent: 'center',
    width: normalize(20),
  },
  textPressable: {
    color: COLORS.black87,
    fontSize: FONT_SIZE.small,
    letterSpacing: letterSpacing,
    paddingLeft: normalize(12),
  },
});
