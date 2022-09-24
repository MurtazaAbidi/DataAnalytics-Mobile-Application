/* eslint-disable react/jsx-filename-extension */
import React from "react";
import Home from "../screens/Home";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import DataAnalyticsScreen from "../screens/DataAnalyticsScreen";
import FilterScreen from "../screens/FilterScreen";
const Tabs = AnimatedTabBarNavigator();
const TabNavigation = () => {
  return (
    
    <Tabs.Navigator
    initialRouteName="home"
      tabBarOptions={{
        activeTintColor: "white",
        // activeColor: "#f0edf6",
        // backgroundColor: 'blue'
        activeBackgroundColor: '#0053bc'
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="home"
              size={size ? size : 24}
              color={focused ? color : "#000"}
              focused={focused}
              // color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="DataAnalytics"
        component={DataAnalyticsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Octicons
              name="graph"
              size={size ? size : 24}
              color={focused ? color : "#222222"}
              focused={focused}
              // color={color}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="Filter"
        component={FilterScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="filter-plus-outline"
              size={size ? size : 24}
              color={focused ? color : "#000"}
              focused={focused}
              // color={color}
            />
          ),
        }}
      /> */}
    </Tabs.Navigator>
  );
};
export default TabNavigation;
