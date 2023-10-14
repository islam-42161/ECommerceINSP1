import { Modal, View, Text, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
} from "react-native-reanimated";
export default function BottomSheetModal({ isVisible, children, onClose }) {
  const modalContentStyle = useAnimatedStyle(() => ({
    height: "25%",
  }));
  return (
    <View style={styles.root}>
      {/* backdrop */}
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: "rgba(0,0,0,0.8)" },
        ]}
      />
      {/* container */}
      <Modal transparent={true} visible={isVisible}>
        <Animated.View style={[styles.modalContent, modalContentStyle]}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Choose a sticker</Text>
            <MaterialIcons
              onPress={onClose}
              name="close"
              color="#fff"
              size={22}
            />
          </View>
          {children}
        </Animated.View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  modalContent: {
    // height: "25%",
    // width: "100%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  headerContainer: {
    height: "16%",
    backgroundColor: "#464C55",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});
