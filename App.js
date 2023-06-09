import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import ItemDetails from './screens/ItemDetails';
import { store } from "./redux/store";
import Test from './screens/test/Test';
import HomeHeader from './components/HomeHeader';
import Homescreen from './screens/Homescreen';

export default function App() {
  return (
     <Provider store={store}>
      {/* <ItemDetails/> */}
      {/* <Test/> */}
      {/* <HomeHeader/> */}
      <Homescreen/>
      <StatusBar style="auto" animated/>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
