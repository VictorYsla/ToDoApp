import React, { useState } from 'react';
import { View, Platform, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, FONT_SIZE } from '../theme';
import { getDate } from '../common/helpers/getDate';
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
};

const DatePicker = ({ setData, data }: Props) => {
  const [show, setShow] = useState(false);

  const onChange = (event: Event | unknown, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date(data.deadLine);
    setShow(Platform.OS === 'ios');
    setData({ ...data, deadLine: Date.parse(currentDate.toISOString()) });
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View>
      <View>
        <Text onPress={showDatepicker} style={styles.text}>
          {' '}
          {getDate(new Date(data.deadLine))}
        </Text>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(data.deadLine)}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  text: {
    backgroundColor: COLORS.gray,
    borderRadius: normalize(10),
    color: COLORS.black38,
    fontSize: FONT_SIZE.small,
    height: normalize(40),
    lineHeight: Platform.OS === 'ios' ? normalize(40) : undefined,
    paddingHorizontal: normalize(10),
    textAlignVertical: 'center',
    overflow: 'hidden',
  },
});
