// app/(top-tabs)/_layout.tsx
import { SplitView } from '@/components/SplitView';
import { useLibraryWallpapers, useLikedWallpapers, useSuggestedWallpapers, useWallpaper } from '@/hooks/useWallpaper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, StatusBar, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

export default function Home() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <Tab.Navigator >
                <Tab.Screen name="Library" component={Library} />
                <Tab.Screen name="Liked" component={Liked} />
                <Tab.Screen name="Suggested" component={Suggested} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

function Liked() {
    const  wallpapers  = useLikedWallpapers() ;
    return <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <SplitView wallpapers={wallpapers} />
    </SafeAreaView>
}

function Suggested() {
    const  wallpapers  = useSuggestedWallpapers() ;
    return <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <SplitView wallpapers={wallpapers} />
    </SafeAreaView>
}
function Library() {
    const  wallpapers  = useLibraryWallpapers() ;
    return <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <SplitView wallpapers={wallpapers} />
    </SafeAreaView>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});