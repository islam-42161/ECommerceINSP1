import { View, Text } from "react-native";
import React, { useState } from "react";
import EmojiPicker from "../../components/EmojiPicker";

export default function Test({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [showAppOptions, setShowAppOptions] = useState(false);

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    //   <Text onPress={() => navigation.goBack()}>Go back</Text>
    // </View>
    <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
      {/* A list of emoji component will go here */}
      <Text>;)</Text>
    </EmojiPicker>
  );
}
