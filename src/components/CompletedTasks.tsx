import React, { PropsWithChildren } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { COLORS, FONT_SIZE, letterSpacing } from '../theme';
import { connect, DispatchProp, Matching } from 'react-redux';
import { AnyAction, CombinedState } from 'redux';
import { normalize } from '../common/helpers/responsive';

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
            />
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
    height: normalize(150),
    justifyContent: 'center',
    marginTop: normalize(20),
  },

  completedTasks: {
    color: COLORS.black87,
    fontSize: FONT_SIZE.large,
    fontWeight: '700',
    letterSpacing: letterSpacing,
    marginBottom: normalize(20),
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
