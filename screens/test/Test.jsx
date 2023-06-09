import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

const Test = () => {
  const [orientationIsLandscape, setOrientation] = useState(true);
  async function changeScreenOrientation() {
    if (orientationIsLandscape == true) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    } else if (orientationIsLandscape == false) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
    return Dimensions.get('screen');
  }
  async function toggleOrientation() {
    setOrientation(!orientationIsLandscape);
    changeScreenOrientation().then((value) => {
      console.log(value);
    });
  }

  return (
    <View style={styles.container}>
      <Text onPress={toggleOrientation}>Click to toggle orientation</Text>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
