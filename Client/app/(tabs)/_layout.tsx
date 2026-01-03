import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF6600',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
        tabBarStyle: { height: 70, paddingBottom: 10 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'होम',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home-outline" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'मतदार शोध',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-plus-outline" size={24} color={color} />,
        }}
      />

      {/* Updated from Search to Settings */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'सेटिंग्स',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cog-outline" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="voting"
        options={{
          title: 'व्होटिंग',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-cog-outline" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="reports"
        options={{
          title: 'रिपोर्ट',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="vote" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="sync"
        options={{
          title: 'sync',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="sync" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}