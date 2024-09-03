import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { setScreen } from '../redux/slices/bottomsheetSlice';

const UserProfileView = () => {
  const { screen } = useSelector((state) => ({
    screen: state.bottomsheet_states.screen,
  }));
  const dispatch = useDispatch()

  // refs
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
    dispatch(setScreen('none'))
  }, []);

  // renders
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
        onPress={handleClosePress}
      />
    ),
    []
  );

  return screen === 'user-profile-view' ? (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      backdropComponent={renderBackdrop}
      style={styles.bottomSheet}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Md. Sazzadul Islam</Text>
      </View>
    </BottomSheet>
  ) : null;
};

export default UserProfileView;

const styles = StyleSheet.create({
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    backgroundColor: '#151515',
    rowGap: 20,
    padding: 20,
    flex: 1
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});