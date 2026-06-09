import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/constants/theme';

export default function RootLayout() {
  return (
    <>
      <Tabs
        initialRouteName="try-catch"
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}>
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen
          name="try-catch"
          options={{
            title: 'Try-Catch',
            headerTitle: 'Try-Catch Demo',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="shield-checkmark-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="component-error"
          options={{
            title: 'Component',
            headerTitle: 'Component Error',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cube-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="api-error"
          options={{
            title: 'API',
            headerTitle: 'Handling API Errors',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cloud-offline-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="console-log"
          options={{
            title: 'Console',
            headerTitle: 'Console Logging',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="terminal-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="devtools"
          options={{
            title: 'DevTools',
            headerTitle: 'React Native DevTools',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="construct-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="debug-tools"
          options={{
            title: 'Debug',
            headerTitle: 'Chrome & VS Code',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bug-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="dark" />
    </>
  );
}
