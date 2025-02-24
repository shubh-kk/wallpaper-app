import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Text, View, StyleSheet, TouchableOpacity, Pressable, Appearance } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Account() {
    const theme = useColorScheme() ?? 'light';

    return (
        <ThemedSafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} >   
                <Header />
                <ThemedView style={styles.content}>
                    <LoginButtons />
                    <ThemeSelector />
                    <About />
                </ThemedView>
            </ScrollView>
        </ThemedSafeAreaView>
    );
}


function Header() {
    return <View style={styles.margin}>
        <ThemedText style={styles.title}>Panels</ThemedText>
        <ThemedText style={styles.titleSmall}>Sign in to save your data</ThemedText>
    </View>
}


function AuthButton({ label, icon }: { label: string, icon: any }) {
    const theme = useColorScheme() ?? 'light';

    return <Pressable style={[
        styles.authButton,
        {
            borderColor: theme === 'light' ? Colors.light.text : Colors.dark.icon
        }
    ]}>
        {icon}
        <ThemedText style={{ fontSize: 20, fontWeight: "600" }}>{label}</ThemedText>
    </Pressable>
}

function LoginButtons() {
    const theme = useColorScheme() ?? 'light';
    return <>
        <AuthButton 
            label={"Sign in"} 
            icon={<Ionicons
                name={'logo-google'}
                size={24}
                color={theme === 'light' ? Colors.light.text : Colors.dark.icon}
            />}
            />
            <AuthButton 
            label={"Sign in"} 
            icon={<Ionicons
                name={'logo-apple'}
                size={24}
                color={theme === 'light' ? Colors.light.text : Colors.dark.icon}
            />}
            />
    </>
}

function ThemeButton({title, selected, colorScheme}: {selected: boolean, title: string, colorScheme: "dark" | "light" | null }) {
    const theme = useColorScheme();

    return <Pressable style={{padding: 10,
        borderWidth: 1,
        borderColor: theme === 'light' ? Colors.light.text : Colors.dark.icon, borderRadius: 5, flex: 0.3}} onPress={() => {
        Appearance.setColorScheme(colorScheme)
    }}>
        <ThemedText style={{ width: "100%", textAlign: "center"}}>{title}</ThemedText>
    </Pressable>
}

function ThemeSelector() {
    return <ThemedView style={styles.margin}>
        <ThemedText style={styles.titleBig}>Settings</ThemedText>
        <ThemedText style={styles.sectionTitle}>Theme</ThemedText>
        <ThemedView style={styles.themeButtonContainer}>
            <ThemeButton title={"Dark"} selected={false} colorScheme="dark"/>
            <ThemeButton title={"Light"} selected={false} colorScheme="light" />
            <ThemeButton title={"System"} selected={false} colorScheme={null} />
        </ThemedView>
    </ThemedView>
}

function About() {
    return <ThemedView style={styles.margin}>
        <ThemedText style={styles.titleBig}>About</ThemedText>
        <ThemedView style={{ marginTop: 10 }}>
            <Pressable>
                <ThemedText style={{ fontSize: 16, marginHorizontal: 10, marginTop: 10 }}>Accont</ThemedText>
            </Pressable>
            <Pressable>
                <ThemedText style={{ fontSize: 16, marginHorizontal: 10, marginTop: 10 }}>Privacy Policy</ThemedText>
            </Pressable>
            <Pressable>
                <ThemedText style={{ fontSize: 16, marginHorizontal: 10, marginTop: 10 }}>Terms of Service</ThemedText>
            </Pressable>
            <Pressable>
                <ThemedText style={{ fontSize: 16, marginHorizontal: 10, marginTop: 10 }}>Licenses</ThemedText>
            </Pressable>
        </ThemedView>
    </ThemedView>
}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontWeight: "600",
        paddingVertical: 15,
    },
    titleBig: {
        fontSize: 22,
        fontWeight: "600",
        padding: 5,
    },
    titleSmall: {
        fontSize: 16,
        textAlign: 'left', 
        marginLeft: 5, 
        color: Colors.light.tabIconDefault,
    },
    margin: {
        padding: 20,
    },
    content: {
        padding: 20,
        paddingHorizontal: 6 // Add horizontal padding for inner content
    },
    sectionTitle: {
        fontSize: 18,
        marginLeft: 5,
        marginVertical: 8,
        fontWeight: '500', // Match "Account" text styling
    },
    authButton: {
        padding: 16,
        marginHorizontal: 20,
        marginVertical: 8,
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 10,
        borderWidth: 1,
        gap: 8
    },
    themeButtonContainer: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        marginTop: 10,
        gap: 10
    }
});