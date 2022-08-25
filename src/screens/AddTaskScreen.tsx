import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Card from '../components/Card';
import { COLORS } from '../theme';
import AddTaskHeader from '../components/AddTaskHeader';
import AddTaskForm from '../components/AddTaskForm';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';

type AddTaskScreen = NativeStackNavigationProp<
  RootStackParamList,
  'AddTaskScreen'
>;

type Props = {
  navigation: AddTaskScreen;
};

const AddTaskScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
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
    borderWidth: 1,
    backgroundColor: COLORS.gray,
    flex: 1,
    justifyContent: 'center',
  },
});
