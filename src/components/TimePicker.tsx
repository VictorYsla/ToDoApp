import React, { useState } from 'react';
import { View, Platform, Pressable, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, FONT_SIZE, SCREEN_HEIGHT } from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getMilliseconds, getTime } from '../common/helpers/getTime';
import { normalize } from '../common/helpers/responsive';

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
    <View style={{ width: '100%' }}>
      <Pressable style={styles.pressable} onPress={showTimepicker}>
        <Text style={styles.text}>
          {' '}
          {getTime(new Date(type ? data.startTime : data.endtime))}
        </Text>
        <Icon name="clock" color={COLORS.black38} size={normalize(15)} />
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
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    borderRadius: normalize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(10),
  },
  text: {
    color: COLORS.black38,
    fontSize: FONT_SIZE.small,
    height: normalize(40),
    lineHeight: normalize(40),
    textAlignVertical: 'center',
  },
});
