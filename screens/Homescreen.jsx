import { StyleSheet, View } from "react-native";
import React from "react";
import HomeHeader from "../components/HomeHeader";
import Searchscreen from "./Searchscreen";
import PreferenceScreen from "../components/PreferenceScreen";
import ChangeHomeView from "../components/ChangeHomeView";
import UserProfileView from "../components/UserProfileView";
import TagsScrollView from "../components/TagsScrollView";
import MasonryGridFlashlist from "../components/MasonryGridFlashlist";
import BottomTab from "../components/BottomTab";

const Homescreen = () => {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <TagsScrollView />
      <MasonryGridFlashlist />
      {/* <BottomTab /> */}
      <>
        <Searchscreen showPreference={true} />
        <PreferenceScreen />
        <ChangeHomeView />
        <UserProfileView />
      </>
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
    rowGap: 20,
  },
});
