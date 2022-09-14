import React, { Dispatch, PropsWithChildren } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { COLORS, FONT_SIZE, letterSpacing, SCREEN_HEIGHT } from '../theme';
import { connect, DispatchProp, Matching } from 'react-redux';
import { actions } from '../contexts/reduxConfig';
import { Action, AnyAction, CombinedState } from 'redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { normalize } from '../common/helpers/responsive';
import { taskProps } from '../common/types';
import { simpleAlert } from '../common/helpers/alert';

type PendingTasks = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

type secundaryProps = {
  navigation: PendingTasks;
  dispatch: Dispatch<Action>;
  pendingTasks: [];
  doneTasks: [];
};

type Props = PropsWithChildren<
  Matching<
    {
      pendingTasks: taskProps[];
      doneTasks: taskProps[];
    } & DispatchProp<AnyAction>,
    Matching<{ tasks: taskProps[] } & DispatchProp<AnyAction>, secundaryProps>
  >
>;

const PendingTasks = ({
  dispatch,
  navigation,
  pendingTasks,
  doneTasks,
  ...props
}: Props) => {
  const doneTask = (value: taskProps) => {
    doneTasks && dispatch(actions.addDoneTask([...doneTasks, value]));
    const currentPendingTask =
      pendingTasks &&
      pendingTasks.filter((item: taskProps) => item.create !== value.create);
    currentPendingTask && dispatch(actions.addPendingTask(currentPendingTask));
  };

  const deleteTask = (task: taskProps) => {
    const currentPendingTask =
      pendingTasks.length &&
      pendingTasks.filter((item: taskProps) => item.create !== task.create);

    simpleAlert(
      'Delete task',
      'Do you wish to delete this "pending" task?',
      () => {},
      () =>
        currentPendingTask &&
        dispatch(actions.addPendingTask(currentPendingTask)),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pendingtext}>Pending tasks</Text>
      <FlatList
        data={pendingTasks}
        keyExtractor={(item) => item.create}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              marginVertical: SCREEN_HEIGHT * 0.009,
            }}
          >
            <Pressable
              style={{ flexDirection: 'row' }}
              onLongPress={() => deleteTask(item)}
            >
              <Pressable
                style={[styles.pressable, { borderColor: item.color }]}
                onPress={() => doneTask(item)}
              ></Pressable>
              <Text style={styles.textPressable} numberOfLines={1}>
                {item.title}
              </Text>
            </Pressable>
          </View>
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
  const doneTasks = state?.doneTasks.doneTasks;
  return {
    pendingTasks,
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
