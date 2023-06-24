import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useRef } from "react";
import ColorThemeTest from "./ColorThemeTest";
import FlashListTest from "./FlashListTest";
import Homescreen from "../Homescreen";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const Test = () => {
  return <Homescreen />;
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: STATUSBAR_HEIGHT,
  },
});
