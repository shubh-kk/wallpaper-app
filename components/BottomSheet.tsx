import { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, StatusBar, Platform, Modal } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Wallpaper } from '@/hooks/useWallpaper';
import Entypo from '@expo/vector-icons/Entypo';
import { ThemedText } from './ThemedText';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemedView } from './ThemedView';
// import Ionicons from '@expo/vector-icons/Ionicons';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

interface PictureBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    wallpaper: Wallpaper;
}

export const PictureBottomSheet = ({ isOpen, wallpaper, onClose }: PictureBottomSheetProps) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['100%'], []); // Full screen
    

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

    return (
        <Modal
            visible={isOpen}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    enablePanDownToClose
                    handleComponent={null}
                    index={0}
                >
                    <BottomSheetView style={styles.contentContainer}>
                            <ThemedView style={styles.imageContainer}>
                                <Image source={{ uri: wallpaper.url }} style={styles.image} resizeMode="cover" />
                                <View style={styles.closeIconContainer}>
                                    <Entypo name="cross" color="white" size={25} onPress={onClose} />
                                </View>

                                {/* Like Icon */}
                                <View style={styles.likeIconContainer}>
                                    <AntDesign name="hearto" color="white" size={25} />
                                </View>

                            </ThemedView>

                            <View style={styles.bottomContent}>
                            <ThemedText style={styles.title}>{wallpaper.name}</ThemedText>
                            <TouchableOpacity style={styles.downloadButton} onPress={downloadImage}>
                                <AntDesign name="download" size={24} color="white" style={{ marginRight: 8 }} />
                                <Text style={styles.downloadText}>Download</Text>
                            </TouchableOpacity>
                        </View>
                    </BottomSheetView>
                </BottomSheet>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    contentContainer: {
        flex: 1,
        // padding: 0,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    imageContainer: {
        width: '100%',
        height: SCREEN_HEIGHT * 0.8, // Increased height to use more space
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    image: {
        width: '100%',
        height: '100%', // Now covers the full height of the container
        // resizeMode: 'cover',
    },
    closeIconContainer: {
        position: 'absolute',
        top: 8,
        left: 14,
        zIndex: 10, // Ensures it stays above the image
        backgroundColor: 'rgba(0,0,0,0.3)', // Light transparent bg for visibility
        padding: 2,
        borderRadius: 50,
    },
    likeIconContainer: {
        position: 'absolute',
        top: 8,
        right: 16,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 2,
        borderRadius: 50,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 15, // Reduced space between image and title
        marginBottom: 12,
        textAlign: 'center',
        color: 'black',
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
        marginTop: 15 // Ensure it's visible on the screen
    },
    downloadText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    bottomContent: {
        paddingHorizontal: 20,  
        paddingVertical: 16,  
    }
});