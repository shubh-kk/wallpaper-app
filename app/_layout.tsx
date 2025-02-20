import { Stack } from "expo-router";

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