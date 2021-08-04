import Card from '../components/Card';
import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import {
  COLORS,
  FONT_SIZE,
  letterSpacing,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../theme';
import HomeHeader from '../components/HomeHeader';
import CompletedTasks from '../components/CompletedTasks';
import PendingTasks from '../components/PendingTasks';
import SceneName from '../navigation/SceneNames';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';

type HomeScreen = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

type Props = {
  navigation: HomeScreen;
};

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Card>
        <HomeHeader />
        <CompletedTasks />
        <PendingTasks navigation={navigation} />
        <View style={styles.view}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? COLORS.primaryDeg : COLORS.primary,
              },
              styles.presable,
            ]}
            onPress={() => navigation.navigate(SceneName.AddTaskScreen)}
          >
            <Text style={styles.textPressable}>Add a task</Text>
          </Pressable>
        </View>
      </Card>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: COLORS.gray,
    flex: 1,
    justifyContent: 'center',
  },

  view: {
    alignItems: 'center',
    // borderWidth: 1,
    height: SCREEN_HEIGHT * 0.07,
    justifyContent: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.1,
    width: SCREEN_WIDTH * 0.9,
  },
  presable: {
    alignItems: 'center',
    borderRadius: SCREEN_HEIGHT * 0.02,
    height: '90%',
    justifyContent: 'center',
    // padding: SCREEN_HEIGHT * 0.01,
    width: '100%',
  },
  textPressable: {
    color: 'white',
    fontSize: FONT_SIZE.normal,
    letterSpacing: letterSpacing,
  },
});
