import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homescreen from "../screens/Homescreen";
import Test from "../screens/test/Test";
import WishlistScreen from "../screens/WishlistScreen";
import CartScreen from "../screens/CartScreen";
import BottomTab from "../components/BottomTab";
import { useSharedValue } from "react-native-reanimated";
import BottomTabNavigator from "./BottomTabNavigator";
import ItemDetails from "../screens/ItemDetails";

const Stack = createNativeStackNavigator();
const Screen = Stack.Screen;
const Navigator = Stack.Navigator;
const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          header: () => null,
        }}
        initialRouteName="bottom_navigator"
      >
        <Screen name="bottom_navigator" component={BottomTabNavigator} />
        <Screen name="item_details" component={ItemDetails} />
      </Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
