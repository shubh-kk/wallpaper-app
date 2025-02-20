import { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Wallpaper } from '@/hooks/useWallpaper';
// import { createStackNavigator } from '@react-navigation/stack';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

export const PictureBottomSheet = ({ wallpaper, isOpen, onClose }: { wallpaper:  Wallpaper, isOpen: boolean; onClose: () => void }) => {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    ///var
    const snapPoints = useMemo(() => ['50%', '75%', '100%'], []);

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
                    snapPoints={['100%']}
                    onChange={handleSheetChanges}
                    enablePanDownToClose={true}
                    index={isOpen ? 0 : -1}
                    handleStyle={styles.handleStyle}
                    backgroundStyle={styles.backgroundStyle}
                    handleComponent={null} // This hides the handles
                >
                    <BottomSheetView style={styles.contentContainer}>
                        <Image
                            source={{ uri: wallpaper.url }}
                            style={styles.image} 
                        />
                        <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 24 }}>{wallpaper.name}</Text>
                        <View style={styles.button}>
                            <Button title='Download' />
                        </View>
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
        display: 'none',
    },
    backgroundStyle: {
        backgroundColor: 'red',
        borderRadius: 0,
        marginTop: 0
    },
    button:{
        padding: 6,
        width: 200,
        borderRadius: 10,
    },
    image: {
        width: "100%",
        height:SCREEN_HEIGHT * 0.7 ,
        borderRadius: 10,
        marginBottom: 16,
        resizeMode: 'cover', 
    }
});
