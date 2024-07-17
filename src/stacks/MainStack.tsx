import React, { FC } from 'react';
import { AppRoutes, MainStackParamList } from '../types/navigation.ts';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostsScreen from '../screens/posts/PostsScreen.tsx';

const Tabs = createBottomTabNavigator<MainStackParamList>();

const MainStack: FC = () => {
  return (
    <Tabs.Navigator screenOptions={{headerShown: false}}>
      <Tabs.Screen name={AppRoutes.POSTS} component={PostsScreen} />
    </Tabs.Navigator>
  );
};

export default MainStack;
