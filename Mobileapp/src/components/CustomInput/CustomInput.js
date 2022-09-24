import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";

const CustomInput = (props) => {
  const { control, name, placeholder, secureTextEntry, rules } = props;
  const [showpassword, setShowPassword] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(false);
  useEffect(() => {
    secureTextEntry ? setEyeIcon(true) : setEyeIcon(false);
  }, []);
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.container,
              {
                flex: 1,
                borderColor: error ? "red" : "#e8e8e8",
                flexDirection: "row",
              },
            ]}
          >
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor="grey"
              secureTextEntry={showpassword ? false : secureTextEntry}
            />
            {/* <Text style={{borderColor:'red', borderWidth:1}}>show</Text> */}
            {eyeIcon ? (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setShowPassword(!showpassword);
                }}
              >
                <Icon
                  style={{ paddingLeft: 40, paddingRight: 10 }}
                  name={showpassword ? "eye" : "eye-slash"}
                  color={"black"}
                  size={20}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          {error && (
            <Text
              style={{
                color: "red",
                paddingHorizontal: 10,
                alignSelf: "stretch",
              }}
            >
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "90%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 7,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    color: "#000",
    padding: 7,
    fontSize: 17,
  },
});
export default CustomInput;
