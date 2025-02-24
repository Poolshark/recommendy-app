import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#f2a964',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#25292e',
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen 
        name="index"
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'mic-circle-sharp' : 'mic-circle-outline'} color={color} size={32} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="recommendations"
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'list-circle-sharp' : 'list-circle-outline'} color={color} size={32} />
          ),
        }} 
      />
    </Tabs>
  );
}