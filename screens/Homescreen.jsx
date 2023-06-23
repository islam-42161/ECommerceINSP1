import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import React, { useRef } from "react";
import HomeHeader from "../components/HomeHeader";
import Searchscreen from "./Searchscreen";
import PreferenceScreen from "../components/PreferenceScreen";
import ChangeHomeView from "../components/ChangeHomeView";
import UserProfileView from "../components/UserProfileView";
import TagsScrollView3 from "../components/TagsScrollView3";

const Homescreen = () => {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <TagsScrollView3 />
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
