import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import TabNavigation from '../TabNavigation';
import CustomDrawer from '../DrawerNavigation/CustomDrawer';

const Stack = createNativeStackNavigator();

const Navigation = (props) => {
  const{initialScreen} = props
  return (
      <Stack.Navigator initialRouteName={initialScreen}  screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="DrawerNavigation" component={CustomDrawer} />
      </Stack.Navigator>
  );
};

export default Navigation;
