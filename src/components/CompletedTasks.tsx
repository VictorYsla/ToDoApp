import { getRandomColor } from '../common/helpers/colorHelper';
import React, { Dispatch, PropsWithChildren } from 'react';
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
import { Action, AnyAction, CombinedState } from 'redux';

const completedTasks = [
  'Design team meeting',
  'Design team meaeting',
  'Design team meesting',
  'Design team meetding',
  'Design team meetaing',
  'Design team meet2aing',
  'Design team meet2a5ing',
  'Design team meet2aa5ing',
  'Design team meet2a5ding',
  'Design team meet2ag5ing',
  'Design team meet2aa5hing',
];

type secundaryProps = {
  doneTasks: [];
};

type Props = PropsWithChildren<
  Matching<
    { doneTasks: [] | undefined } & DispatchProp<AnyAction>,
    secundaryProps
  >
>;

const CompletedTasks = ({ doneTasks }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.completedTasks}>Completed tasks</Text>
      <FlatList
        data={doneTasks}
        keyExtractor={(item) => item.create}
        renderItem={({ item }) => (
          <View style={styles.view}>
            <Pressable
              style={[
                styles.pressable,
                { backgroundColor: item.color, borderColor: item.color },
              ]}
            >
              <Icon name="check" color="white" />
            </Pressable>
            <Text style={styles.textPressable}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

type stateProps = CombinedState<{ doneTasks: { doneTasks: [] } }> | undefined;

const mapStateToProps = (state: stateProps) => {
  const doneTasks = state?.doneTasks.doneTasks;
  return {
    doneTasks,
  };
};
export default connect(mapStateToProps)(CompletedTasks);

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    borderColor: 'red',
    height: SCREEN_HEIGHT * 0.2,
    justifyContent: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.1,
    marginTop: SCREEN_HEIGHT * 0.04,
  },

  completedTasks: {
    // borderWidth: 1,
    color: COLORS.black87,
    fontSize: FONT_SIZE.large,
    fontWeight: '700',
    letterSpacing: letterSpacing,
    width: SCREEN_WIDTH * 0.5,
    marginBottom: SCREEN_HEIGHT * 0.04,
  },

  view: {
    // borderWidth: 1,
    flexDirection: 'row',
    marginVertical: SCREEN_HEIGHT * 0.009,
  },
  pressable: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: SCREEN_HEIGHT * 0.004,
    height: SCREEN_HEIGHT * 0.02,
    justifyContent: 'center',
    width: SCREEN_HEIGHT * 0.02,
  },
  textPressable: {
    color: COLORS.black87,
    fontSize: FONT_SIZE.small,
    letterSpacing: letterSpacing,
    paddingLeft: SCREEN_HEIGHT * 0.012,
    width: '90%',
  },
});
