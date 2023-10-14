import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import BottomSheetModal from "../../components/BottomSheet/BottomSheetModal";

const Test = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [showAppOptions, setShowAppOptions] = useState(true);

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.root}>
      <BottomSheetModal isVisible={isModalVisible} onClose={onModalClose} />
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
