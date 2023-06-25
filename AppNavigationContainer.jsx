import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homescreen from "./screens/Homescreen";
import Test from "./screens/test/Test";
import WishlistScreen from "./screens/WishlistScreen";
import CartScreen from "./screens/CartScreen";
import BottomTab from "./components/BottomTab";

const Stack = createNativeStackNavigator();
const Screen = Stack.Screen;
const Navigator = Stack.Navigator;
const AppNavigationContainer = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          header: () => null,
        }}
        initialRouteName="home"
      >
        <Screen name="home" component={Homescreen} />
        <Screen name="cart" component={CartScreen} />
        <Screen name="heart" component={WishlistScreen} />
        <Screen name="settings" component={Test} />
      </Navigator>
      <BottomTab />
    </NavigationContainer>
  );
};

export default AppNavigationContainer;

const styles = StyleSheet.create({});
