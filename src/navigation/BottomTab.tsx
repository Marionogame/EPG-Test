import React from 'react';

// Constants
import Theme from '../constants/Theme';
import { HEIGHT } from '../constants/Layout';

// Module
import Home from '../screens/Home/HomeScreen';
import PlayPageScreen from '../screens/playPage/PlayPageScreen';
import playPageListScreen from '../screens/playPageList/PlayPageListScreen';

// Library
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: HEIGHT * 0.065,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          borderWidth: 1,
          borderColor: '#ffffff',
        },
        tabBarActiveTintColor: Theme.redSoft,
        tabBarInactiveTintColor: Theme.lightSoft,
      }}
    >
      <Tab.Screen
        name="EGP"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="blinds" color={color} size={size} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="Play"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="laptop-windows" color={color} size={size} />
          ),
        }}
        component={PlayPageScreen}
      />
      <Tab.Screen
        name="List"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="video-library" color={color} size={size} />
          ),
        }}
        component={playPageListScreen}
      />
    </Tab.Navigator>
  );
};
