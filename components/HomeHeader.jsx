import { StyleSheet, View, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { setScreen } from "../redux/slices/bottomsheetSlice";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Image } from "expo-image";
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const HomeHeader = ({
  welcome_message,
  headerPositionY,
  navigation,
  children,
}) => {
  const handleUserPress = () => {
    dispatch(setScreen("user-profile-view"));
  };
  const dispatch = useDispatch();

  const headerStyle = useAnimatedStyle(() => ({
    // backgroundColor: "#141414",
    // position: "absolute",
    // width: "100%",
    // alignSelf: "center",
    // zIndex: 100,
    // transform: [
    //   {
    //     translateY: interpolate(
    //       headerPositionY.value,
    //       [0, 100],
    //       [0, -110 + STATUSBAR_HEIGHT * 1.5],
    //       Extrapolate.CLAMP
    //     ),
    //   },
    // ],
  }));
  return (
    <Animated.View style={[styles.container, headerStyle]}>
      <Animated.View style={[styles.header]}>
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
                uri: "https://themuslim500.com/wp-content/uploads/2018/05/tariq-jameel-0.jpg",
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
      </Animated.View>
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
      {children}
    </Animated.View>
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
    // backgroundColor: "lightgray",
    // textAlign: "center",
    // textAlignVertical: "center",
    // fontSize: 24,
    borderRadius: 20,
    // color: "white",
    alignItems: "center",
    justifyContent: "center", // overflow: "hidden",
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
