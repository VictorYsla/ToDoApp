import React, { Dispatch, PropsWithChildren, useEffect, useState } from 'react';
import { Pressable, Text, StyleSheet, View, Keyboard } from 'react-native';
import {
  COLORS,
  FONT_SIZE,
  letterSpacing,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../theme';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import Picker from './Picker';
import { remind, repeat } from '../common/data/data';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { connect, DispatchProp, Matching } from 'react-redux';
import { Action, AnyAction, CombinedState } from 'redux';
import { actions } from '../contexts/reduxConfig';
import { getRandomColor } from '../common/helpers/colorHelper';

type AddTaskForm = NativeStackNavigationProp<
  RootStackParamList,
  'AddTaskScreen'
>;

type Props = {
  navigation: AddTaskForm;
  dispatch: Dispatch<Action>;
  tasks: [];
};

type otherProp = PropsWithChildren<
  Matching<{ tasks: [] | undefined } & DispatchProp<AnyAction>, Props>
>;

const today = Date.parse(new Date().toISOString());

const initialValues = {
  title: '',
  deadLine: today,
  startTime: today,
  endtime: today,
  remind: 10,
  repeat: 'Weekly',
};

const AddTaskForm = ({ dispatch, navigation, tasks, ...props }: otherProp) => {
  const [showRemind, setShowRemind] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [data, setData] = useState(initialValues);

  const sendTask = () => {
    tasks &&
      dispatch(
        actions.addTask([
          ...tasks,
          {
            ...data,
            create: Date.parse(new Date().toISOString()),
            color: getRandomColor(),
          },
        ]),
      );
    alert('Task created!');
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardStatus(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardStatus(false); // or some other action
        Keyboard.dismiss();
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Pressable
      style={{
        height: keyboardStatus ? SCREEN_HEIGHT * 0.4 : SCREEN_HEIGHT * 0.8,
      }}
      onPress={() => (
        Keyboard.dismiss(), setShowRemind(false), setShowRepeat(false)
      )}
    >
      <ScrollView>
        <View
          style={{
            height: SCREEN_HEIGHT * 0.68,
            paddingHorizontal: SCREEN_WIDTH * 0.1,
          }}
        >
          <View style={{ marginTop: SCREEN_HEIGHT * 0.03 }}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.input}
              value={data.title}
              onChangeText={(text) => setData({ ...data, title: text })}
            />
          </View>
          <View style={{ marginTop: SCREEN_HEIGHT * 0.03 }}>
            <Text style={styles.inputLabel}>Deadline</Text>
            <DatePicker setData={setData} data={data} />
          </View>
          <View
            style={{ marginTop: SCREEN_HEIGHT * 0.03, flexDirection: 'row' }}
          >
            <View style={{ width: '50%' }}>
              <Text style={styles.inputLabel}>Start time</Text>
              <TimePicker setData={setData} data={data} type={true} />
            </View>
            <View style={{ width: '50%' }}>
              <Text style={styles.inputLabel}>End time</Text>
              <TimePicker setData={setData} data={data} />
            </View>
          </View>
          <View style={{ marginTop: SCREEN_HEIGHT * 0.03 }}>
            <Text style={styles.inputLabel}>Remind</Text>
            <Picker
              setShow={setShowRemind}
              show={showRemind}
              options={remind}
              height={SCREEN_HEIGHT * 0.15}
              text={'minutes early'}
              setData={setData}
              data={data}
            />
          </View>
          <View style={{ marginTop: SCREEN_HEIGHT * 0.03 }}>
            <Text style={styles.inputLabel}>Repeat</Text>
            <Picker
              setShow={setShowRepeat}
              show={showRepeat}
              options={repeat}
              height={SCREEN_HEIGHT * 0.06}
              setData={setData}
              data={data}
            />
          </View>
        </View>
        <View style={styles.pressableContainer}>
          <Pressable
            style={({ pressed }) => [
              { backgroundColor: pressed ? COLORS.primaryDeg : COLORS.primary },
              styles.pressable,
            ]}
            onPress={sendTask}
          >
            <Text style={styles.pressableText}>Add a task</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Pressable>
  );
};

type stateProps = CombinedState<{ tasks: { tasks: [] } }> | undefined;

const mapStateToProps = (state: stateProps) => ({
  tasks: state?.tasks.tasks,
});
export default connect(mapStateToProps)(AddTaskForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pressableContainer: {
    alignItems: 'center',
    // borderWidth: 1,
    height: SCREEN_HEIGHT * 0.07,
    justifyContent: 'center',
    // marginTop: SCREEN_HEIGHT * 0.025,
    paddingHorizontal: SCREEN_WIDTH * 0.1,
    width: SCREEN_WIDTH * 0.9,
  },

  pressable: {
    alignItems: 'center',
    borderRadius: SCREEN_HEIGHT * 0.02,
    height: '90%',
    justifyContent: 'center',
    marginBottom: SCREEN_HEIGHT * 0.07,
    width: '100%',
  },
  pressableText: {
    color: 'white',
    fontSize: FONT_SIZE.normal,
    letterSpacing: letterSpacing,
  },

  inputLabel: {
    //   borderWidth: 1,
    color: COLORS.black87,
    fontSize: FONT_SIZE.normal,
    fontWeight: '700',
    letterSpacing: SCREEN_WIDTH * 0.0009,
    marginBottom: SCREEN_HEIGHT * 0.005,
    width: SCREEN_WIDTH * 0.45,
  },
  input: {
    //   borderWidth: 1,
    backgroundColor: COLORS.gray,
    borderRadius: SCREEN_HEIGHT * 0.009,
    color: COLORS.black38,
    fontSize: FONT_SIZE.small,
    fontWeight: '700',
    height: SCREEN_HEIGHT * 0.05,
    paddingHorizontal: SCREEN_HEIGHT * 0.01,
  },
});
