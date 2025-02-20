import { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
// import { createStackNavigator } from '@react-navigation/stack';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const PictureBottomSheet = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            onClose();
        }
    }, [onClose]);

    // renders
    return (
        <View style={styles.overlay}>
            <GestureHandlerRootView style={styles.container}>
                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={['90%']}
                    onChange={handleSheetChanges}
                    enablePanDownToClose={true}
                    index={isOpen ? 0 : -1}
                    handleStyle={styles.handleStyle}
                    backgroundStyle={styles.backgroundStyle}
                    handleComponent={null} // This hides the handles
                >
                    <BottomSheetView style={styles.contentContainer}>
                        <Text>Awesome 🎉</Text>
                    </BottomSheetView>
                </BottomSheet>
            </GestureHandlerRootView>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 2,
    },
    container: {
        flex: 1,
        height: SCREEN_HEIGHT,
    },
    contentContainer: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
    },
    handleStyle: {
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    backgroundStyle: {
        backgroundColor: 'white',
    },
});
