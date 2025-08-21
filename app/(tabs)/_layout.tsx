import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
        // Set global screen options for the tabs
        screenOptions={{
            tabBarActiveTintColor: '#ffd33d', // Active tab icon color
            headerStyle: {
                backgroundColor: '#25292e', // Header background color
            },
            headerShadowVisible: false, // Remove header shadow
            headerTintColor: '#fff', // Header text color
            tabBarStyle: {
                backgroundColor: '#25292e', // Tab bar background color
                borderTopWidth: 0, // Remove the top border
            },
            headerTitleAlign: 'center' // Center the header title
        }}
    >
        <Tabs.Screen 
            name="index"
            options={{ 
                title: 'Home', // Title displayed in the header
                tabBarIcon: ({ color, focused }) => (
                    // Icon for the "Home" tab, changes based on focus state
                    <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                ),
            }}
        />
        <Tabs.Screen
            name="about"
            options={{
                title: 'About', // Title displayed in the header
                tabBarIcon: ({ color, focused }) => (
                    // Icon for the "About" tab, changes based on focus state
                    <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
                ),
            }}
        />
    </Tabs>
  );
}
