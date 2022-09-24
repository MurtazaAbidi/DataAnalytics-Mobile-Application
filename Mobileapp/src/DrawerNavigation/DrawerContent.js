import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Caption,
  Drawer,
  Paragraph,
  Text,
  Title,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import getEnvVars from "../../environment";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import ModalChangePassword from "../components/Modal/ModalChangePassword";

const { apiUrl } = getEnvVars();

const DrawerContent = (props) => {
  const Navigation = useNavigation();
  const [adminName, setAdminName] = useState();
  const [adminEmail, setAdminEmail] = useState();
  const [totalFans, setTotalFans] = useState();
  const [changePasswordBox, setChangePasswordBox] = useState(false);
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
          setAdminName(response.data[0].fullname);
          setAdminEmail(response.data[0].email);
          setTotalFans(response.data[0].fanscount);
        }
      })
      .catch(function (error) {});
  }, []);

  const SignOut = () => {
    axios
      .post(
        // body: JSON.stringify({
        `http://${apiUrl}/api/v1/logout`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          // console.warn (response.data.msg)
          // Navigation.navigate("SignIn")
          Navigation.reset({
            index: 0,
            routes: [{ name: "SignIn" }],
          });
        }
      })
      .catch(function (error) {
        console.warn(error.response.data);
        Navigation.navigate("SignIn");
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={require("../../assets/images/defaultProfilePic.jpeg")}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>{adminName}</Title>
                <Caption style={styles.caption}>{adminEmail}</Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {totalFans}
                </Paragraph>
                <Caption style={styles.caption}>Fans</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
          icon={({ color, size }) => (
            <Icon name="rename-box" color={color} size={size} />
          )}
          label="Change Username"
          onPress={()=>{}}
        />
      <ModalChangePassword changePasswordBox={changePasswordBox} setChangePasswordBox= {setChangePasswordBox} />
          <DrawerItem
          icon={({ color, size }) => (
            <Icon name="email-outline" color={color} size={size} />
          )}
          label="Change Email"
          onPress={{}}
        />
          <DrawerItem
          icon={({ color, size }) => (
            <Icon name="account-key" color={color} size={size} />
          )}
          label="Change Password"
          onPress={()=>{setChangePasswordBox(true)}}
        />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={SignOut}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },

  title: { fontSize: 16, marginTop: 3, fontWeight: "bold" },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alighItems: "center",
  },
  section: {
    flexDirection: "row",
    alighItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;
