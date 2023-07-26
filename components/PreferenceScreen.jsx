import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import BottomSheet from "./BottomSheet";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { setScreen } from "../redux/slices/bottomsheetSlice";

const PreferenceScreen = ({ categories }) => {
  const { screen } = useSelector((state) => ({
    screen: state.bottomsheet_states.screen,
  }));
  const dispatch = useDispatch();
  return screen === "preference-search" || screen === "preference-home" ? (
    <BottomSheet topPosition={"30%"} contentContainerStyle={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          columnGap: 40,
          padding: 10,
          // borderRadius: 10,
          // borderWidth: 2,
          // borderColor: "rgba(255,255,255,0.1)",
        }}
      >
        <FontAwesome name="sliders" size={24} color="lightgray" />

        <Text
          style={{
            color: "lightgray",
            fontSize: 20,
            fontWeight: "bold",
            // flex: 1,
          }}
        >
          Categories
        </Text>
        <Ionicons
          name="close"
          style={styles.closeIcon}
          onPress={() => {
            dispatch(setScreen("none"));
          }}
        />
      </View>
      <FlatList
        data={categories}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ rowGap: 10 }}
        keyExtractor={(_, index) => index}
        // numColumns={2}
        renderItem={({ item, index, seperator }) => (
          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "gray",
              columnGap: 40,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.1)",
              flex: 1,
            }}
          >
            <FontAwesome name="check-circle" size={24} color="#9ce12d" />
            <Text
              style={{
                color: "lightgray",
                textTransform: "capitalize",
                fontSize: 16,
                fontWeight: "500",
                flex: 1,
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </BottomSheet>
  ) : null;
};

export default PreferenceScreen;

const styles = StyleSheet.create({
  container: {
    rowGap: 20,
    padding: 30,
    backgroundColor: "#141414",
  },
  closeIcon: {
    height: 24,
    width: 24,
    fontSize: 12,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 12,
    backgroundColor: "#343434",
    color: "lightgray",
  },
});
