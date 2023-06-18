import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import TagsScrollView1 from "../../components/TagsScrollView1";
import TagsScrollView2 from "../../components/TagsScrollView2";

const Test = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 30,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TagsScrollView2 />
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
