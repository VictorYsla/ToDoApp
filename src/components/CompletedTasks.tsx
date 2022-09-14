import React, { Dispatch, PropsWithChildren } from 'react';
import { Pressable, Text, StyleSheet, View, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { COLORS, FONT_SIZE, letterSpacing } from '../theme';
import { connect, Matching } from 'react-redux';
import { Action, CombinedState } from 'redux';
import { normalize } from '../common/helpers/responsive';
import { actions } from '../contexts/reduxConfig';
import { taskProps } from '../common/types';
import { simpleAlert } from '../common/helpers/alert';

type ActionsProps = (
  addTask: (tasks: taskProps[]) => {
    type: string;
    pendingTasks: taskProps[];
  },
  addDoneTask: (doneTasks: taskProps[]) => {
    type: string;
    doneTasks: taskProps[];
  },
) => void;

type secundaryProps = {
  dispatch: Dispatch<Action>;
  doneTasks: [];
  pendingTasks: [];
};

type Props = PropsWithChildren<
  Matching<
    { pendingTasks: taskProps[]; doneTasks: taskProps[] } & ActionsProps,
    secundaryProps
  >
>;

const CompletedTasks = ({ dispatch, doneTasks, pendingTasks }: Props) => {
  const deleteTask = (task: taskProps) => {
    const currentDoneTask =
      doneTasks.length &&
      doneTasks.filter((item: taskProps) => item.create !== task.create);

    simpleAlert(
      'Delete task',
      'Do you wish to delete this "complete" task?',
      () => {},
      () => currentDoneTask && dispatch(actions.addDoneTask(currentDoneTask)),
    );
  };

  const undoCompleteTask = (task: taskProps) => {
    const currentDoneTasks =
      doneTasks.length &&
      doneTasks.filter((item: taskProps) => item.create !== task.create);
    currentDoneTasks && dispatch(actions.addDoneTask(currentDoneTasks));

    dispatch(actions.addPendingTask([...pendingTasks, task]));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.completedTasks}>Completed tasks</Text>
      <FlatList
        data={doneTasks}
        keyExtractor={(item) => item.create}
        renderItem={({ item }) => (
          <Pressable style={styles.view} onLongPress={() => deleteTask(item)}>
            <Pressable
              style={[
                styles.pressable,
                { backgroundColor: item.color, borderColor: item.color },
              ]}
              onPress={() => undoCompleteTask(item)}
            />
            <Text style={styles.textPressable}>{item.title}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

type stateProps = CombinedState<{
  pendingTasks: { pendingTasks: taskProps[] };
  doneTasks: { doneTasks: taskProps[] };
}>;

const mapStateToProps = (state: stateProps) => {
  const pendingTasks = state?.pendingTasks.pendingTasks;
  const doneTasks: taskProps[] = state?.doneTasks.doneTasks;
  return {
    doneTasks,
    pendingTasks,
  };
};
export default connect(mapStateToProps)(CompletedTasks);

const styles = StyleSheet.create({
  container: {
    height: normalize(200),
    justifyContent: 'center',
    marginTop: normalize(20),
  },

  completedTasks: {
    color: COLORS.black87,
    fontSize: FONT_SIZE.large,
    fontWeight: '700',
    letterSpacing: letterSpacing,
    marginBottom: normalize(10),
  },

  view: {
    flexDirection: 'row',
    marginVertical: normalize(10),
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
