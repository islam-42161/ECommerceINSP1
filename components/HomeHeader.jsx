import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Pressable,
} from "react-native";
import React, { useRef } from "react";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import SearchBar from "./SearchBar";
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Entypo name="grid" style={styles.headerbuttons} />
        <Ionicons name="ios-person-circle-sharp" style={styles.headerbuttons} />
      </View>
      <Text style={styles.headertext}>
        We have prepared new products <Text style={styles.specialText}>for you ✌️</Text>
      </Text>

<SearchBar enablePreference searchable={false}/>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 1.5 * STATUSBAR_HEIGHT,
    padding: 20,
    // flex: 0.3,
    // backgroundColor: "#151515", //remove
    // borderBottomColor: "#474747", //remove
    // borderBottomWidth: 5,//remove
    // borderBottomStartRadius: 50,//remove
    // borderBottomEndRadius: 50,//remove
    overflow: "hidden",
    justifyContent: "space-between",
    rowGap:20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerbuttons: {
    width: 40,
    height: 40,
    backgroundColor: "#343434",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 24,
    borderRadius: 15,
    color: "white",
    elevation: 5,
  },
  headertext: {
    fontSize: 30,
    fontWeight: "300",
    color: "white",
    letterSpacing: 2,
  },
  specialText: {
    color: "#9ce12d",
    fontWeight: "500",
  },
});
