import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useWallpaper } from "@/hooks/useWallpaper";
import { StyleSheet, Image, useWindowDimensions, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SplitView } from '@/components/SplitView';

export default function Explore() {
    const { width: windowWidth } = useWindowDimensions();
    const { wallpapers } = useWallpaper();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
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
                <SplitView wallpapers={wallpapers} />
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