import Card from '../components/Card';
import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
} from 'react-native';
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
import { normalize } from '../common/helpers/responsive';

type HomeScreen = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

type Props = {
  navigation: HomeScreen;
};

const HomeScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        { marginVertical: Platform.OS === 'android' ? normalize(15) : 0 },
      ]}
    >
      <Card>
        <View style={{ flex: 1 }}>
          <HomeHeader />
          <View style={{ marginHorizontal: normalize(20) }}>
            <CompletedTasks />
            <PendingTasks navigation={navigation} />
          </View>
        </View>
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
      </Card>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    flex: 1,
    justifyContent: 'center',
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
});
