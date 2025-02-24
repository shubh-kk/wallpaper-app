import { Wallpaper } from "@/hooks/useWallpaper";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, View, useWindowDimensions } from "react-native";
import { ImageCard } from "./ImageCard";
import { PictureBottomSheet } from "./BottomSheet";
import React from "react";

export const SplitView = ({ wallpapers }: { wallpapers: Wallpaper[] }) => {
    const { width: windowWidth } = useWindowDimensions();
    const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);

    const isTablet = windowWidth >= 768;
    const numColumns = isTablet ? 3 : 2;

    const handleImagePress = useCallback((item: Wallpaper) => {
        console.log('Image pressed:', item.name);
        setSelectedWallpaper(item);
    }, []);

    const renderItem = useCallback(({ item }: { item: Wallpaper }) => (
        <ImageCard
            item={item}
            onPress={handleImagePress}
        />
    ), [handleImagePress]);

    const keyExtractor = useCallback((item: Wallpaper) => (
        item.id.toString()
    ), []);

    return (
        <>
            <View style={styles.container}>
                <FlatList
                    data={wallpapers}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    key={`flatList-${numColumns}`} // Key changes when numColumns changes
                    numColumns={numColumns}
                    columnWrapperStyle={styles.row}
                    // scrollEnabled={false}
                    nestedScrollEnabled={true}
                    removeClippedSubviews={true}
                    initialNumToRender={isTablet ? 9 : 6}
                    maxToRenderPerBatch={isTablet ? 12 : 8}
                    windowSize={5}
                />
            </View>
            {selectedWallpaper && (
                <PictureBottomSheet 
                    wallpaper={selectedWallpaper} 
                    isOpen={!!selectedWallpaper} 
                    onClose={() => setSelectedWallpaper(null)} 
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ensure the container takes full height
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        marginBottom: 12,
    },
});