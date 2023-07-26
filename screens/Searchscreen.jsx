import { Keyboard, Pressable, StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { EvilIcons } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import PreferenceScreen from "../components/PreferenceScreen";
import TagsScrollView from "../components/TagsScrollView";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const Searchscreen = ({ showPreference = true, navigation }) => {
  const { categories } = useSelector((state) => ({
    categories: state.homescreen_states.categories,
  }));
  return (
    <Pressable
      style={styles.bottomSheetContentStyle}
      onPress={() => Keyboard.dismiss()}
    >
      <View style={styles.headerbar}>
        <SearchBar
          showPreference={showPreference}
          searchable={true}
          focus={true}
        />
        <EvilIcons
          name="close"
          style={styles.closebutton}
          onPress={() => navigation.goBack()}
        />
      </View>
      <TagsScrollView categories={categories} />
      <>
        <PreferenceScreen categories={categories} />
      </>
    </Pressable>
  );
};

export default Searchscreen;

const styles = StyleSheet.create({
  bottomSheetContentStyle: {
    paddingTop: STATUSBAR_HEIGHT * 1.5,
    paddingHorizontal: "6%",
    rowGap: 20,
    // backgroundColor: "red",
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#151515",
  },
  closebutton: {
    width: 30,
    height: 30,
    backgroundColor: "#343434",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    borderRadius: 15,
    color: "white",
    // alignSelf: "flex-end",
  },
  headerbar: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    columnGap: 40,
  },
});
