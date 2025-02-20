import { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Button, StatusBar, Platform } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Wallpaper } from '@/hooks/useWallpaper';
import Entypo from '@expo/vector-icons/Entypo';
import { ThemedText } from './ThemedText';

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import AntDesign from '@expo/vector-icons/AntDesign';

// import Ionicons from '@expo/vector-icons/Ionicons';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

interface PictureBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    wallpaper: Wallpaper;
}

export const PictureBottomSheet = ({ isOpen, wallpaper, onClose }: PictureBottomSheetProps) => {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // var
    const snapPoints = useMemo(() => ['50%', '75%', '100%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            onClose();
        }
    }, [onClose]);

    const downloadImage = async () => {
        try {
            // First, request permissions - using the newer MediaLibrary API directly
            const { status } = await MediaLibrary.requestPermissionsAsync();
            
            if (status !== 'granted') {
                alert('Sorry, we need media library permissions to save the image');
                return;
            }
            
            // Generate a unique filename with timestamp
            const filename = `wallpaper-${Date.now()}.jpg`;
            // Use cache directory for temporary storage
            const fileUri = `${FileSystem.cacheDirectory}${filename}`;
            
            // Download the file to cache directory
            const downloadResult = await FileSystem.downloadAsync(
                wallpaper.url,
                fileUri
            );
            
            if (downloadResult.status === 200) {
                // Save the downloaded file to media library
                try {
                    const asset = await MediaLibrary.createAssetAsync(fileUri);
                    
                    // On Android, you can save to an album
                    if (Platform.OS === 'android') {
                        // Check if the Download album exists
                        const albums = await MediaLibrary.getAlbumsAsync();
                        const downloadAlbum = albums.find(album => album.title === 'Download');
                        
                        if (downloadAlbum) {
                            await MediaLibrary.addAssetsToAlbumAsync([asset], downloadAlbum, false);
                        } else {
                            await MediaLibrary.createAlbumAsync('Download', asset, false);
                        }
                    }
                    
                    // Clean up the cache file
                    await FileSystem.deleteAsync(fileUri, { idempotent: true });
                    
                    alert('Image saved to your gallery successfully');
                } catch (err) {
                    console.error("Error saving to media library:", err);
                    alert('Failed to save to gallery');
                }
            } else {
                alert('Failed to download image');
            }
        } catch (error) {
            console.error('Error in download process:', error);
            alert('Error downloading image');
        }
    };

    // renders
    return (
        <View style={styles.overlay}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
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
                        <View style={styles.imageContainer}>

                            <View style={styles.closeIconContainer}>
                                <Entypo name="cross" color="white" size={34} onPress={onClose} />
                            </View>

                            {/* Like Icon */}
                            <View style={styles.likeIconContainer}>
                                <AntDesign name="hearto" color="white" size={38} />
                            </View>

                            <Image source={{ uri: wallpaper.url }} style={styles.image} resizeMode="cover" />
                        </View>

                        <ThemedText style={styles.title}>{wallpaper.name}</ThemedText>
                        <TouchableOpacity style={styles.downloadButton} onPress={downloadImage}>
                            <AntDesign name="download" size={24} color="white" style={{ marginRight: 8 }} />
                            <Text style={styles.downloadText}>Download</Text>
                        </TouchableOpacity>
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
        marginTop: 0,

    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 1,
        marginTop: 12,
        marginBottom: 14,
        paddingVertical: 8,
    },
    image: {
        width: "100%",
        height: "100%", // Ensure it fills the container
        borderRadius: 14,
        marginBottom: 14,
    },
    imageWrapper: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 8, // Shadow for Android
    },
    handleStyle: {
        display: 'none',
    },
    backgroundStyle: {
        backgroundColor: 'white',
        borderRadius: 0,
        marginTop: 0
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 26,
        marginBottom: 12,
        textAlign: 'center',
        color: 'black',
    },
    downloadText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeIconContainer: {
        position: 'absolute',
        top: 29,
        left: 16,
        zIndex: 10, // Ensures it stays above the image
        backgroundColor: 'rgba(0,0,0,0.3)', // Light transparent bg for visibility
        padding: 2,
        borderRadius: 50,
    },
    likeIconContainer: {
        position: 'absolute',
        top: 29,
        right: 16,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 2,
        borderRadius: 50,
    },   
    imageContainer: {
        width: '100%',
        height: SCREEN_HEIGHT * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
        marginBottom: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
        position: 'relative', // Ensures icon positioning inside
    },
    
    downloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        padding: 12,
        borderRadius: 25,
        width: SCREEN_WIDTH * 0.7,
        alignSelf: 'center',
        marginTop: 10, // Add spacing after image
        zIndex: 5, // Ensure it's above bottom sheet
    },
});