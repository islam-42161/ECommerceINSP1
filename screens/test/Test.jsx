import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Test = ({ navigation }) => {
  // const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.goBack()}>Test: Go back</Text>
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
