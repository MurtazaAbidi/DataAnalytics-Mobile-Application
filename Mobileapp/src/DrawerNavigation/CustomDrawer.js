import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import TabNavigation from "../TabNavigation";
import DrawerContent from "./DrawerContent";

const Drawer = createDrawerNavigator();

const CustomDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="FanXP" component={TabNavigation} />
    </Drawer.Navigator>
  );
};

export default CustomDrawer;
