import React, { Dispatch, PropsWithChildren, useState } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
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
import { normalize } from '../common/helpers/responsive';

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={{ borderWidth: 1 }}>
          <View style={{ marginTop: normalize(15) }}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.input}
              value={data.title}
              onChangeText={(text) => setData({ ...data, title: text })}
            />
          </View>
          <View style={{ marginTop: normalize(15) }}>
            <Text style={styles.inputLabel}>Deadline</Text>
            <DatePicker setData={setData} data={data} />
          </View>
          <View style={{ marginTop: normalize(15), flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={styles.inputLabel}>Start time</Text>
              <TimePicker setData={setData} data={data} type={true} />
            </View>
            <View style={{ width: '50%' }}>
              <Text style={styles.inputLabel}>End time</Text>
              <TimePicker setData={setData} data={data} />
            </View>
          </View>
          <View style={{ marginTop: normalize(15) }}>
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
        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? COLORS.primaryDeg : COLORS.primary },
            styles.presable,
          ]}
          onPress={sendTask}
        >
          <Text style={styles.textPressable}>Add a task</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
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

  presable: {
    alignItems: 'center',
    borderRadius: normalize(15),
    height: normalize(40),
    justifyContent: 'center',
    marginBottom: normalize(20),
    marginHorizontal: normalize(20),
  },
  textPressable: {
    color: 'white',
    fontSize: FONT_SIZE.normal,
    letterSpacing: letterSpacing,
  },

  inputLabel: {
    color: COLORS.black87,
    fontSize: FONT_SIZE.normal,
    fontWeight: '700',
    letterSpacing: SCREEN_WIDTH * 0.0009,
    marginBottom: SCREEN_HEIGHT * 0.005,
    width: SCREEN_WIDTH * 0.45,
  },
  input: {
    backgroundColor: COLORS.gray,
    borderRadius: SCREEN_HEIGHT * 0.009,
    color: COLORS.black38,
    fontSize: FONT_SIZE.small,
    fontWeight: '700',
    height: SCREEN_HEIGHT * 0.05,
    paddingHorizontal: SCREEN_HEIGHT * 0.01,
  },
});
