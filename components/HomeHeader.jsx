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
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const HomeHeader = ({keyboardref}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Entypo name="grid" style={styles.headerbuttons} />
        <Ionicons name="ios-person-circle-sharp" style={styles.headerbuttons} />
      </View>
      <Text style={styles.headertext}>
        We have prepared new products <Text style={styles.specialText}>for you ✌️</Text>
      </Text>

      <View style={styles.searchsection}>
        <Pressable style={styles.textinput} onPress={()=>keyboardref.current.focus()}>
          <EvilIcons style={styles.searchicon} name="search" />
          <TextInput
            placeholder="Search"
            placeholderTextColor={"gray"}
            style={{ padding: 5 }}
            ref={keyboardref}
          />
        </Pressable>
        <FontAwesome
          name="sliders"
          style={styles.preferenceicon}
        />
      </View>
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
  searchicon: {
    width: 24,
    height: 24,
    fontSize: 24,
    color: "white",
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
  textinput: {
    flexDirection: "row",
    borderRadius: 30,
    backgroundColor: "#343434",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    flex: 1,
    columnGap: 10,
  },
  searchsection: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  preferenceicon:{
    height: 48, 
    width: 48, 
    borderRadius: 24,
    backgroundColor: "#343434",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    color: "white",
    elevation: 0, 
  }
});
