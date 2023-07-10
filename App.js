import { StatusBar } from "expo-status-bar";
import { StyleSheet, LogBox } from "react-native";
import { Provider } from "react-redux";
import ItemDetails from "./screens/ItemDetails";
import { store } from "./redux/store";
import Test from "./screens/test/Test";
import HomeHeader from "./components/HomeHeader";
import Homescreen from "./screens/Homescreen";
import { usePreventScreenCapture } from "expo-screen-capture";
import AppNavigationContainer from "./navigation/RootNavigator";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import RootNavigator from "./navigation/RootNavigator";

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
export default function App() {
  usePreventScreenCapture();
  return (
    <Provider store={store}>
      {/* <AppNavigationContainer /> */}
      <RootNavigator />
      <StatusBar style="auto" animated />
    </Provider>
  );
}
