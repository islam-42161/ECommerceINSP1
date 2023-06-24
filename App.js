import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import ItemDetails from "./screens/ItemDetails";
import { store } from "./redux/store";
import Test from "./screens/test/Test";
import HomeHeader from "./components/HomeHeader";
import Homescreen from "./screens/Homescreen";
import { usePreventScreenCapture } from "expo-screen-capture";

export default function App() {
  usePreventScreenCapture();
  return (
    <Provider store={store}>
      {/* <ItemDetails/> */}
      <Test />
      {/* <HomeHeader/> */}
      {/* <Homescreen /> */}
      <StatusBar style="auto" animated />
    </Provider>
  );
}
