import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Pressable,
} from "react-native";
import React, { useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { setScreen } from "../redux/slices/bottomsheetSlice";
import TagsScrollView from "./TagsScrollView";
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const HomeHeader = () => {
  const { view } = useSelector((state) => ({
    view: state.homescreen_states.view,
  }));

  const handleViewChange = () => {
    dispatch(setScreen("change_home_list_view"));
  };
  const handleUserPress = () => {
    dispatch(setScreen("user-profile-view"));
  };
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name={view}
          style={styles.headerbuttons}
          onPress={handleViewChange}
        />
        <Ionicons
          name="ios-person-circle-sharp"
          style={styles.headerbuttons}
          onPress={handleUserPress}
        />
      </View>
      <Text numberOfLines={2} adjustsFontSizeToFit style={styles.headertext}>
        We have prepared new products{" "}
        <Text style={styles.specialText}>for you ✌️</Text>
      </Text>

      <SearchBar showPreference searchable={false} />
      <TagsScrollView />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 1.5 * STATUSBAR_HEIGHT,
    padding: 30,
    overflow: "hidden",
    justifyContent: "space-between",
    rowGap: 30,
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
    fontSize: 20,
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
