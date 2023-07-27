import { View, Text, StyleSheet, StatusBar } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import TagsScrollView from "../components/TagsScrollView";
import { setScreen } from "../redux/slices/bottomsheetSlice";
import ChangeHomeView from "../components/ChangeHomeView";
import PreferenceScreen from "../components/PreferenceScreen";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const CompleteList = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { view, categories } = useSelector((state) => ({
    view: state.homescreen_states.view,
    categories: state.homescreen_states.categories,
  }));
  const handleViewChange = () => {
    dispatch(setScreen("change_home_list_view"));
  };
  const { all_items, welcome_text } = route.params;

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Ionicons
          name="chevron-back-sharp"
          onPress={() => navigation.goBack()}
          style={[styles.headerbuttons]}
        />
        <SearchBar
          showPreference={true}
          searchable={false}
          navigation={navigation}
          welcome_message={welcome_text}
        />
        <MaterialIcons
          name={view}
          style={styles.headerbuttons}
          onPress={handleViewChange}
        />
      </View>
      {/* body */}
      <View style={styles.body}>
        <TagsScrollView categories={categories} />
      </View>
      <>
        <ChangeHomeView />
        <PreferenceScreen />
      </>
    </View>
  );
};

export default CompleteList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#141414",
    paddingTop: STATUSBAR_HEIGHT * 1.5,
    paddingHorizontal: "6%",
    rowGap: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 20,
    // width: "100%",
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
  },
  body: {
    flex: 1,
    rowGap: 20,
  },
});
