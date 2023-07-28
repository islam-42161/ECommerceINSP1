import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Pressable,
  TouchableOpacity,
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
import Animated, {
  Extrapolate,
  SlideInUp,
  SlideOutUp,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Image } from "expo-image";
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const HomeHeader = ({
  welcome_message,
  categories,
  headerPositionY,
  navigation,
}) => {
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

  const headerStyle = useAnimatedStyle(() => ({
    top: headerPositionY.value,
    // transform: [
    //   {
    //     translateY: headerPositionY.value,
    //   },
    // ],
  }));
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <MaterialIcons
          name={view}
          style={styles.headerbuttons}
          onPress={handleViewChange}
        /> */}
        <SearchBar
          showPreference={false}
          searchable={false}
          navigation={navigation}
          welcome_message={welcome_message}
        />

        <TouchableOpacity
          onPress={handleUserPress}
          style={[styles.headerbuttons]}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.explicit.bing.net%2Fth%3Fid%3DOIP.HcDiUVSF_CqQkcTdko02LQHaIS%26pid%3DApi&f=1&ipt=83bc72f204676e87af8f54283b6d26d71e582fcca3ec233d509061fb020d1333&ipo=images",
              }}
              style={StyleSheet.absoluteFillObject}
            />
          </View>
        </TouchableOpacity>
        {/* <Ionicons
          name="ios-person-circle-sharp"
          style={[styles.headerbuttons]}
          onPress={handleUserPress}
        /> */}
      </View>
      {/* <Animated.Text
        numberOfLines={2}
        adjustsFontSizeToFit
        style={styles.headertext}
      >
        <Text style={styles.specialText}>{welcome_message.split("!")[0]}!</Text>
        {welcome_message.split("!")[1]}!{welcome_message.split("!")[2]}
      </Animated.Text> */}

      {/* <SearchBar showPreference searchable={false} /> */}
      {/* <TagsScrollView /> */}
      {/* <TagsScrollView categories={categories} /> */}
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 1.5 * STATUSBAR_HEIGHT,
    overflow: "hidden",
    justifyContent: "space-between",
    rowGap: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 20,
    width: "100%",
  },
  imageContainer: {
    borderRadius: 15,
    height: 30,
    width: 30,
    overflow: "hidden",
  },
  headerbuttons: {
    width: 40,
    height: 40,

    backgroundColor: "#343434",
    // textAlign: "center",
    // textAlignVertical: "center",
    // fontSize: 24,
    borderRadius: 20,
    // color: "white",
    alignItems: "center",

    justifyContent: "center", // overflow: "hidden",
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
