import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  FadeOutDown,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
const BottomTab = ({
  tabs = ["home", "cart", "heart", "settings"],
  listScrollY,
  bottomPosition,
}) => {
  const navigation = useNavigation();
  const pressHandler = useCallback((screen) => {
    navigation.navigate(screen);
  }, []);

  const { screen } = useSelector((state) => ({
    screen: state.bottomsheet_states.screen,
  }));
  useDerivedValue(() => {
    if (screen === "none") {
      bottomPosition.value = withTiming(20);
    } else {
      bottomPosition.value = withTiming(-100);
    }
  }, [screen]);

  const bottomStyle = useAnimatedStyle(() => ({
    bottom: bottomPosition.value,
  }));
  return (
    <Animated.View style={[styles.container, bottomStyle]}>
      {tabs.map((value, index) => {
        return (
          <AnimatedIcon
            key={index}
            onPress={() => pressHandler(value)}
            name={`ios-${value}-outline`}
            style={[
              styles.bottomButtons,
              {
                color: index === 0 ? "lightgray" : "gray",
              },
            ]}
          />
        );
      })}
    </Animated.View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    padding: 20,
    columnGap: 20,
    backgroundColor: "#343434",
    borderRadius: 20,
  },
  bottomButtons: {
    width: 40,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 24,
    // borderRadius: 15,
    color: "white",
    // elevation: 5,
  },
});
