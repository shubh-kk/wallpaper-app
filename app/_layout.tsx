import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function Layout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen 
                name="(nobottombar)/accountinfo" 
                options={{ 
                    headerShown: true, 
                    headerTitle: 'Account Info',
                    headerBackTitle: 'Back'
                }} 
            />
        </Stack>
    );
}