import { StatusBar } from "expo-status-bar";
import { StyleSheet, LogBox } from "react-native";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import { usePreventScreenCapture } from "expo-screen-capture";
import RootNavigator from "./navigation/RootNavigator";

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
export default function App() {
  usePreventScreenCapture();
  return (
    <Provider store={store}>
      {/* <AppNavigationContainer /> */}
      <RootNavigator />
      <StatusBar style="dark" animated />
    </Provider>
  );
}
