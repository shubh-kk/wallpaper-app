import { PictureBottomSheet } from "@/components/BottomSheet";
import { useState } from "react";
import { Text, Button, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
    const [sheetOpen, setSheetOpen] = useState(false);

    return (
        <SafeAreaView style={styles.content}>
            <View style={styles.container}>
                

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        zIndex: 1,
    },
});