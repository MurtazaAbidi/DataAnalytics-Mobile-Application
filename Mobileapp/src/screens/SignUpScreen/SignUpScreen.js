import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import axios from "axios";
import ModalSuccessfull from "../../components/Modal/ModalSuccessfull";
import getEnvVars from "../../../environment";
const { apiUrl } = getEnvVars();

const EMAIL_REGEX = /\S+@\S+\.\S+$/;

const SignUpScreen = () => {
  const [visibleModal, setVisibleModal] = useState(false);

  const Navigation = useNavigation();

  const {
    control,
    handleSubmit,
    resetField,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
    },
  });
  const pwd = watch("password");

  const onRegisterPressed = (data) => {
    console.log(data);

    axios
      .post(
        // body: JSON.stringify({
        `http://${apiUrl}/api/v1/admin/signup`,
        {
          name: data.username,
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
          resetField("username");
          resetField("email");
          resetField("password");
          resetField("passwordRepeat");
          // Alert.alert("Registration Successfull");
          setVisibleModal(true);
        }
      })
      .catch(function (error) {
        Alert.alert(error.response.data.msg);
        console.log(error.response.data.msg);
      });
  };
  const onSignInPressed = () => {
    Navigation.navigate("SignIn");
  };
  const onTermsOfUsePressed = () => {
    console.warn("onTermsOfUsePressed");
  };
  const onPrivacyPressed = () => {
    console.warn("onPrivacyPressed");
  };

  return (
    <SafeAreaView style={{ marginTop: 50 }}>
      <ScrollView>
        <View style={styles.root}>
          <Text style={styles.title}>Create an Account</Text>
          <CustomInput
            name="username"
            placeholder="Username"
            control={control}
            rules={{
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username should be at least 3 characters long",
              },
              maxLength: {
                value: 24,
                message: "Username should be maximum 24 characters long",
              },
            }}
          />
          <CustomInput
            name="email"
            placeholder="Email"
            control={control}
            rules={{
              required: "Email is required",
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
                message: "Password should be at least 8 characters long",
              },
            }}
            secureTextEntry
          />
          <CustomInput
            name="passwordRepeat"
            placeholder="Repeat Password"
            control={control}
            rules={{
              validate: (value) => value === pwd || "Password do not match",
            }}
            secureTextEntry
          />
          <CustomButton
            text="Register"
            onPress={handleSubmit(onRegisterPressed)}
          />
          <Text style={styles.text}>
            By registering, you confirm that you accept our{" "}
            <Text style={styles.link} onPress={onTermsOfUsePressed}>
              Term of Use
            </Text>{" "}
            and{" "}
            <Text style={styles.link} onPress={onPrivacyPressed}>
              Privacy Policy
            </Text>
          </Text>
          <ModalSuccessfull visibleModal={visibleModal} setVisibleModal={setVisibleModal} showText="Congratulations registration was Successfull"/>
          <CustomButton
            text="Have an acount? SignIn"
            onPress={onSignInPressed}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 30,
  },

  text: {
    color: "#000",
    fontWeight: "600",
    width: "90%",
    margin: 10,
  },

  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default SignUpScreen;
