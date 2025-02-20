import { useCallback } from 'react';
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ImageCard } from "@/components/ImageCard";
import { useWallpaper, Wallpaper } from "@/hooks/useWallpaper";
import { View, StyleSheet, Image, FlatList, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {
    const { width: windowWidth } = useWindowDimensions();
    const { wallpapers } = useWallpaper();

    const isTablet = windowWidth >= 768;
    const numColumns = isTablet ? 3 : 2;

    const handleImagePress = useCallback((item: Wallpaper) => {
        console.log('Image pressed:', item.name);
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
        <SafeAreaView style={styles.container}>
            <ParallaxScrollView
                headerBackgroundColor={{ dark: 'white', light: 'white' }}
                headerImage={
                    <Image
                        style={[
                            styles.headerImage,
                            { width: windowWidth }
                        ]}
                        source={{ uri: wallpapers[0].url }}
                        accessibilityLabel="Featured wallpaper"
                    />
                }
            >
                <View >
                    <FlatList
                        data={wallpapers}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        key={`flatList-${numColumns}`} // Key changes when numColumns changes
                        numColumns={numColumns}
                        columnWrapperStyle={styles.row}
                        scrollEnabled={false}
                        removeClippedSubviews={true}
                        initialNumToRender={isTablet ? 9 : 6}
                        maxToRenderPerBatch={isTablet ? 12 : 8}
                        windowSize={5}
                    />
                </View>
            </ParallaxScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerImage: {
        flex: 1,
        height: 300,
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        marginBottom: 12,
    },
    list: {
        backgroundColor: "white"
    }
});