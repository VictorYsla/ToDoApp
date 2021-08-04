import React, { useState } from 'react';
import { View, Platform, Pressable, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, FONT_SIZE, SCREEN_HEIGHT } from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getMilliseconds, getTime } from '../common/helpers/getTime';

type Props = {
  setData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      deadLine: number;
      startTime: number;
      endtime: number;
      remind: number;
      repeat: string;
    }>
  >;
  data: {
    title: string;
    deadLine: number;
    startTime: number;
    endtime: number;
    remind: number;
    repeat: string;
  };
  type?: boolean;
};

const TimePicker = ({ setData, data, type }: Props) => {
  const [show, setShow] = useState(false);

  const onChange = (event: Event | unknown, selectedDate?: Date) => {
    const currentDate =
      selectedDate || new Date(type ? data.startTime : data.endtime);
    setShow(Platform.OS === 'ios');
    const milliseconds = getMilliseconds(currentDate, data.deadLine);
    !type && setData({ ...data, endtime: milliseconds });
    type && setData({ ...data, startTime: milliseconds });
  };

  const showTimepicker = () => {
    setShow(true);
  };

  return (
    <View style={{ width: '90%' }}>
      <Pressable style={styles.pressable} onPress={showTimepicker}>
        <Text style={styles.text}>
          {' '}
          {getTime(new Date(type ? data.startTime : data.endtime))}
        </Text>
        <Icon name="clock" color={COLORS.black38} />
      </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(type ? data.startTime : data.endtime)}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  pressable: {
    //   borderWidth: 1,
    borderRadius: SCREEN_HEIGHT * 0.009,
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    flexDirection: 'row',
  },
  text: {
    color: COLORS.black38,
    fontSize: FONT_SIZE.small,
    fontWeight: '700',
    height: SCREEN_HEIGHT * 0.05,
    paddingHorizontal: SCREEN_HEIGHT * 0.01,
    textAlignVertical: 'center',
    width: '80%',
  },
});
