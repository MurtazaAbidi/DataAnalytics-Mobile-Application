
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import * as Progress from "react-native-progress";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import CustomDrawer from "./src/DrawerNavigation/CustomDrawer";
import Navigation from "./src/Navigation/Navigation";
import TabNavigation from "./src/TabNavigation";
import { StatusBar } from "expo-status-bar";
import getEnvVars from "./environment";
const {apiUrl} = getEnvVars();


const App = () => {
  const [auth, setAuth] = useState(false);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {

    // Update the document title using the browser API
    axios
      .post(
        // body: JSON.stringify({
        `http://${apiUrl}/api/v1/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then(function (response) {
        
        if (response.status === 200) {
          setAuth(true);
          setVisible(true);
          
          // console.warn (response.data)
        }
      })
      .catch(function (error) {
        setVisible(true);
        setAuth(false);
        // if (response.status === 500){
        //   console.warn (error.message)
        // }
        
      });

  }, []);
  return (
    <>
    {visible?
      <SafeAreaView style={styles.root}>
        {console.warn(auth)}
        <StatusBar
        animated={true}
        backgroundColor="#BDDFFF"
        barStyle="default"
        translucent = {true}
        hidden={false}
        />
        <NavigationContainer>
          {auth?
          <Navigation initialScreen="DrawerNavigation"/>
          :<Navigation initialScreen="SignIn"/>}
        </NavigationContainer>
      </SafeAreaView>
    :<SafeAreaView style={{flex:1, justifyContent:"center" , alignItems:"center"}}><Progress.CircleSnail color={["red", "green", "blue"]} /></SafeAreaView>
      }
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor:'#F9FBFC',
    backgroundColor: "#fff",
  },
});

export default App;
