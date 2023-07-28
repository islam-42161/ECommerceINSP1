import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BottomSheet from "./BottomSheet";
import { useSelector } from "react-redux";

const UserProfileView = () => {
  const { screen } = useSelector((state) => ({
    screen: state.bottomsheet_states.screen,
  }));
  return screen === "user-profile-view" ? (
    <BottomSheet topPosition={"20%"} contentContainerStyle={styles.container}>
      <Text style={styles.text}>User Profile page</Text>
    </BottomSheet>
  ) : null;
};

export default UserProfileView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#151515",
    rowGap: 20,
    padding: 20,
  },
  text: {
    color: "white",
    fontWeight: "400",
    fontSize: 24,
  },
});
