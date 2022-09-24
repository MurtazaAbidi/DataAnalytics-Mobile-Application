import {
    View,
    Text,
    Modal,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated,
    TextInput,
  } from "react-native";
  import React, { useEffect, useRef, useState } from "react";
  
  const ModalChangePassword = (props) => {
    const { changePasswordBox, setChangePasswordBox } = props;
    const [showModal, setShowModal] = useState(changePasswordBox);
    const scaleValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      toggleModel();
    }, [changePasswordBox]);
    const toggleModel = () => {
      if (changePasswordBox) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => {
          setShowModal(false);
        }, 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
  
    return (
      <Modal transparent visible={showModal}>
        <View style={styles.modalBackground}>
          <Animated.View
            style={[
              styles.modalContainer,
              { transform: [{ scale: scaleValue }] },
            ]}
          >
            <View style={{ alignItems: "center" }}>
              <View style={[styles.header,{bordercolor:'black', borderWidth:2, flexDirection:'row'}]}>
                <Text style={{flex:1, bordercolor:'black', borderWidth:2, fontSize:20, fontWeight:'bold', textDecorationLine:'underline'}}>
                    Change Password
                </Text>
                <TouchableOpacity style={{bordercolor:'black', borderWidth:2}} onPress={() => setChangePasswordBox(false)}>
                  <Image
                    source={require("../../../assets/images/x.png")}
                    style={{ height: 30, width: 30,  }}
                  />
                </TouchableOpacity>
              </View>
              <View>
                {/* <View style={{ alignItems: "center" }}>
                  <Image
                    source={require("../../../assets/images/success.png")}
                    style={{ height: 150, width: 150, marginVertical: 10 }}
                  />
                </View> */}
                <View
                  style={{
                    marginVertical: 30,
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  <Text>Change Password</Text>
                 <View
                 style={
                    
                    {
                    //   flex: 1,
                    //   borderColor: error ? "red" : "#e8e8e8",
                      borderColor: "#e8e8e8",
                      borderWidth:3,
                      flexDirection: "row",
                      backgroundColor: "white",
                      padding:1,
                      borderRadius:20
                    
    // width: "90%",
                    }}
                  >
                    <TextInput
                    style={ {color: "#000",
                    padding: 7,
                    fontSize: 17, }}
                    // value={value}
                    // onChangeText={onChange}
                    // onBlur={onBlur}
                    placeholder="Placeholder"
                    placeholderTextColor="grey"
                    // secureTextEntry={showpassword ? false : secureTextEntry}
                    secureTextEntry={false }
                    />

                 </View>
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      width: "80%",
      backgroundColor: "white",
      paddingHorizontal: 20,
      paddingVertical: 30,
      borderRadius: 20,
      elevation: 20,
    },
    header: {
      width: "100%",
      height: 40,
      alignItems: "flex-end",
    },
  });
  
  export default ModalChangePassword;
  