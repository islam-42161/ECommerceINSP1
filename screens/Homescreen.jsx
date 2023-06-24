import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import React, { useRef } from "react";
import HomeHeader from "../components/HomeHeader";
import Searchscreen from "./Searchscreen";
import PreferenceScreen from "../components/PreferenceScreen";
import ChangeHomeView from "../components/ChangeHomeView";
import UserProfileView from "../components/UserProfileView";
import TagsScrollView from "../components/TagsScrollView";
import FlashListTest from "./test/FlashListTest";

const Homescreen = () => {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <TagsScrollView />
      <FlashListTest />

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
  },
});
