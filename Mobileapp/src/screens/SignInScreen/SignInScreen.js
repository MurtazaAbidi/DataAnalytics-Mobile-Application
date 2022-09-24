import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Logo from "./../../../assets/images/logo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import getEnvVars from "../../../environment";
import ModalSuccessfull from "../../components/Modal/ModalSuccessfull";
const { apiUrl } = getEnvVars();

const EMAIL_REGEX = /\S+@\S+\.\S+$/;

const SignInScreen = () => {
  const Navigation = useNavigation();
  const [apiWait, setApiWait] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    resetField,
    getValues,
    formState: { errors },
  } = useForm();

  const { height } = useWindowDimensions();

  const onSignInPressed = (data) => {
    setApiWait(true);
    console.log(data.email);
    console.log(data.password);
    axios
      .post(
        // body: JSON.stringify({
        `http://${apiUrl}/api/v1/admin/login`,
        {
          email: data.email,
          password: data.password,
          // }),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.status.toString());

        if (response.status === 200) {
          // Alert.alert("Login Successfull");
          // console.warn(response.headers.auth);
          // Cookies.getAll()
          // console.warn(Cookies.get("auth"))
          reset({
            ...getValues,
            password: "",
          });
          // resetField('password')

          Navigation.reset({
            index: 0,
            routes: [{ name: "DrawerNavigation" }],
          });
          // Navigation.navigate("DrawerNavigation");
        }
      })
      .catch(function (error) {
        Alert.alert(error.response.data.msg);
        // console.warn (error.response.data.msg)
      });
    setApiWait(false);
  };

  const onSignUpPressed = () => {
    Navigation.navigate("SignUp");
  };

  return (
    <>
      {apiWait ? (
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Progress.CircleSnail color={["red", "green", "blue"]} />
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView>
          <ScrollView>
            <View style={styles.root}>
              <Text style={styles.logoText}>FanXP</Text>
              <Image
                source={Logo}
                styles={[styles.logo, { height: height * 0.3 }]}
                resizeMode="contain"
              />
              <CustomInput
                name="email"
                placeholder="Email"
                control={control}
                rules={{
                  required: "email is required",
                  pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
                }}
              />
              <CustomInput
                name="password"
                placeholder="Password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password should be minimum 8 characters long",
                  },
                }}
                secureTextEntry
              />
                        {/* <ModalSuccessfull visibleModal={visibleModal} setVisibleModal={setVisibleModal} showText="hello checking Text 1 2 3 . . . . "/> */}
              <CustomButton
                text="Sign In"
                onPress={handleSubmit(onSignInPressed)}
              />
              {/* <CustomButton
                text="checking modal...."
                onPress={()=>{setVisibleModal(true)}}
              /> */}
              <CustomButton
                text="Don't have an Account? Create One "
                onPress={onSignUpPressed}
                type="TERTIARY"
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 300,
  },
  logoText: {
    color: "black",
    fontSize: 50,
    //fontFamily: 'fantasy',
    fontWeight: "bold",
    margin: 15,
  },
});

export default SignInScreen;
