import { PictureBottomSheet } from "@/components/BottomSheet";
import { useState } from "react";
import { Text, Button, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
    const [sheetOpen, setSheetOpen] = useState(false);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.content}>
                <Text>Accounts Page</Text>
                <Button 
                    title="Open Bottom Sheet" 
                    onPress={() => setSheetOpen(true)}
                />
            </SafeAreaView>
            {sheetOpen && (
                <PictureBottomSheet
                    isOpen={sheetOpen}
                    
                    onClose={() => setSheetOpen(false)}
                />
            )}
        </View>
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