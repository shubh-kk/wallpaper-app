// app/(top-tabs)/_layout.tsx
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, View } from 'react-native';


const Tab = createMaterialTopTabNavigator();

export default function Home() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Library" component={Library} />
            <Tab.Screen name="Liked" component={Liked} />
            <Tab.Screen name="Suggested" component={Suggested} />
            {/* ... */}
        </Tab.Navigator>
    );
}

function Liked() {
    return <Text>Liked Screen</Text>;
}

function Suggested() {
    return <Text>Suggested Tab Screen</Text>;
}
function Library() {
    return <Text>Library Tab Screen</Text>;
}
