import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homescreen from "../screens/Homescreen";
import WishlistScreen from "../screens/WishlistScreen";
import CartScreen from "../screens/CartScreen";
import Test from "../screens/test/Test";
import BottomTab from "../components/BottomTab";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

const Tab = createBottomTabNavigator();
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <BottomTab {...props} />}
        screenOptions={{
          tabBarHideOnKeyboard: true,
          header: () => null,
        }}
      >
        <Tab.Screen
          name="Home"
          initialParams={{
            name: "ios-home-outline",
          }}
          component={Homescreen}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          initialParams={{
            name: "ios-cart-outline",
          }}
        />
        <Tab.Screen
          name="Wishlist"
          component={WishlistScreen}
          initialParams={{
            name: "ios-heart-outline",
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Test}
          initialParams={{
            name: "ios-settings-outline",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    padding: 20,
    columnGap: 20,
    backgroundColor: "#343434",
    borderRadius: 20,
  },
  bottomButtons: {
    width: 40,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 24,
    // borderRadius: 15,
    color: "white",
    // elevation: 5,
  },
});
