import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Card from '../components/Card';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS, FONT_SIZE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../theme';
import AddTaskHeader from '../components/AddTaskHeader';
import AddTaskForm from '../components/AddTaskForm';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { ScrollView } from 'react-native-gesture-handler';

type AddTaskScreen = NativeStackNavigationProp<
  RootStackParamList,
  'AddTaskScreen'
>;

type Props = {
  navigation: AddTaskScreen;
};

const AddTaskScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Card>
        <AddTaskHeader navigation={navigation} />
        <AddTaskForm navigation={navigation} />
      </Card>
    </View>
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
