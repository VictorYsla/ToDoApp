import React, { useState } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, SCREEN_HEIGHT } from '../theme';

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  options: string[] | number[];
  height: number;
  text?: string | undefined;
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

const Picker = ({
  setShow,
  show,
  options,
  height,
  text,
  data,
  setData,
}: Props) => {
  const { remind, repeat } = data;

  const option = options.map((item, index) => {
    return (
      <Pressable
        key={index}
        style={{ marginVertical: SCREEN_HEIGHT * 0.003 }}
        onPress={() => (
          typeof item === 'number' && setData({ ...data, remind: item }),
          typeof item !== 'number' && setData({ ...data, repeat: item }),
          setShow(false)
        )}
      >
        <Text style={styles.optionText}>{`${item} ${text ? text : ''}`}</Text>
      </Pressable>
    );
  });

  return (
    <View style={{ width: '90%' }}>
      <Text style={styles.dataText} onPress={() => setShow(!show)}>{`${
        typeof options[0] === 'number' ? data.remind : data.repeat
      } ${text ? text : ''}`}</Text>
      {show && <View style={[styles.view, { height: height }]}>{option}</View>}
    </View>
  );
};

export default Picker;

const styles = StyleSheet.create({
  optionText: {
    //   borderWidth: 1,
    // backgroundColor: COLORS.gray,
    borderRadius: SCREEN_HEIGHT * 0.009,
    color: COLORS.black38,
    fontSize: FONT_SIZE.small,
    fontWeight: '700',
    height: SCREEN_HEIGHT * 0.023,
    paddingHorizontal: SCREEN_HEIGHT * 0.01,
    textAlignVertical: 'center',
  },
  dataText: {
    //   borderWidth: 1,
    backgroundColor: COLORS.gray,
    borderRadius: SCREEN_HEIGHT * 0.009,
    color: COLORS.black38,
    fontSize: FONT_SIZE.small,
    fontWeight: '700',
    height: SCREEN_HEIGHT * 0.05,
    paddingHorizontal: SCREEN_HEIGHT * 0.01,
    textAlignVertical: 'center',
  },
  view: {
    backgroundColor: COLORS.gray,
    // borderBottomWidth: 1,
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    marginTop: SCREEN_HEIGHT * 0.05,
    position: 'absolute',
    zIndex: 3,
    width: '100%',
  },
});
