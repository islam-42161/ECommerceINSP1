import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import HomeHeader from "../components/HomeHeader";
import Searchscreen from "./Searchscreen";
import PreferenceScreen from "../components/PreferenceScreen";
import ChangeHomeView from "../components/ChangeHomeView";
import UserProfileView from "../components/UserProfileView";
import TagsScrollView from "../components/TagsScrollView";
import MasonryGridFlashlist from "../components/MasonryGridFlashlist";
import { useSharedValue } from "react-native-reanimated";

const Homescreen = ({ navigation, route }) => {
  // const listScrollY = route.params?.listScrollY;
  // const bottomPosition = route.params?.bottomPosition;
  const listScrollY = useSharedValue(0);
  const bottomPosition = useSharedValue(20);
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://dummyjson.com/products/")
      .then((response) => response.json())
      .then((json) => {
        setData(json.products);
      });
  }, []);
  return (
    <View style={styles.container}>
      <HomeHeader listScrollY={listScrollY} />
      <MasonryGridFlashlist
        data={data}
        bottomPosition={bottomPosition}
        listScrollY={listScrollY}
        navigation={navigation}
      />
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
    // rowGap: 20,
  },
});
