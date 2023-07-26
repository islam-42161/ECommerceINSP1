import { View, Text } from "react-native";
import React from "react";

export default function Test({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text onPress={() => navigation.goBack()}>Go back</Text>
    </View>
  );
}
