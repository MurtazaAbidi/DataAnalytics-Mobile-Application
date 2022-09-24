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

const ModalSuccessfull = (props) => {
  const { visibleModal, setVisibleModal, showText } = props;
  const [showModal, setShowModal] = useState(visibleModal);
  const scaleValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    toggleModel();
  }, [visibleModal]);
  const toggleModel = () => {
    if (visibleModal) {
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
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setVisibleModal(false)}>
                <Image
                  source={require("../../../assets/images/x.png")}
                  style={{ height: 30, width: 30 }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../../../assets/images/success.png")}
                  style={{ height: 150, width: 150, marginVertical: 10 }}
                />
              </View>
              <Text
                style={{
                  marginVertical: 30,
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                {showText}
              </Text>
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

export default ModalSuccessfull;
