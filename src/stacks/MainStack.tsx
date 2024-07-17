import React, { FC } from 'react';
import { AppRoutes, MainStackParamList } from '../types/navigation.ts';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostsScreen from '../screens/posts/PostsScreen.tsx';
import CustomTabBar from '../components/CustomTabBar.tsx';

const Tabs = createBottomTabNavigator<MainStackParamList>();

const MainStack: FC = () => {
  return (
    <Tabs.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{headerShown: false}}>
      <Tabs.Screen name={AppRoutes.POSTS} component={PostsScreen} />
    </Tabs.Navigator>
  );
};

export default MainStack;
