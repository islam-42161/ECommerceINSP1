import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import ItemDetails from "../screens/ItemDetails";
import Searchscreen from "../screens/Searchscreen";
import CompleteList from "../screens/CompleteList";
import GalleryCarousel from "../components/GalleryCarousel";

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
        <Screen name="search_screen" component={Searchscreen} />
        <Screen name="item_details" component={ItemDetails} />
        <Screen name="complete_list" component={CompleteList} />
        <Screen name="gallery_carousel" component={GalleryCarousel} />
      </Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
