import { StatusBar } from "expo-status-bar";
import { StyleSheet, LogBox } from "react-native";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import { usePreventScreenCapture } from "expo-screen-capture";
import RootNavigator from "./navigation/RootNavigator";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { AppState } from "react-native";

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
function App() {
  // usePreventScreenCapture();
  return (
    <Provider store={store}>
      {/* <AppNavigationContainer /> */}
      <RootNavigator />
      <StatusBar style="light" animated />
    </Provider>
  );
}
export default gestureHandlerRootHOC(App);
