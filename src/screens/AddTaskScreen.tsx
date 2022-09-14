import React from 'react';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import Card from '../components/Card';
import { COLORS } from '../theme';
import AddTaskHeader from '../components/AddTaskHeader';
import AddTaskForm from '../components/AddTaskForm';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { normalize } from '../common/helpers/responsive';

type AddTaskScreen = NativeStackNavigationProp<
  RootStackParamList,
  'AddTaskScreen'
>;

type Props = {
  navigation: AddTaskScreen;
};

const AddTaskScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        { marginVertical: Platform.OS === 'android' ? normalize(15) : 0 },
      ]}
    >
      <Card>
        <AddTaskHeader navigation={navigation} />
        <AddTaskForm navigation={navigation} />
      </Card>
    </SafeAreaView>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    flex: 1,
    justifyContent: 'center',
  },
});
