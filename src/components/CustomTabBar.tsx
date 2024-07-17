import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TABS_LIST } from '../types/navigation.ts';
import Colors from '../styles/colors.ts';

const CustomTabBar: FC<BottomTabBarProps> = ({ navigation, descriptors, state }) => {
  useWindowDimensions();

  const currentTabIndex = navigation.getState().index;

  const navigateToPath = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <View>
      <View style={[styles.tabsWrapper, { height: 60, paddingTop: 2 }]}>
        {TABS_LIST.map((route, index) => {
          const IconComponent = route.icon;
          const iconColor = currentTabIndex === index ? Colors.ACTIVE_ICON : Colors.BLUE_MAIN;

          return (
            <TouchableOpacity
              accessibilityRole="button"
              key={route.screenTitle}
              style={styles.iconWrapper}
              onPress={() => navigateToPath(route.screenTitle)}
            >
              <IconComponent color={iconColor} style={{ width: 25, height: 25 }} />
              <Text style={{ ...styles.tabName, fontSize: 16 }}>{route.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsWrapper: {
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  iconWrapper: {
    alignItems: 'center',
    width: '20%',
  },
  tabName: {
    opacity: 0.5,
  },
});

export default CustomTabBar;
