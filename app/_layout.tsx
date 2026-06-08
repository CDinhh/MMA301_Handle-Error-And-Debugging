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
        <Tabs.Screen name="try-catch" options={{ title: 'Try-Catch', headerTitle: 'Try-Catch Demo' }} />
        <Tabs.Screen
          name="component-error"
          options={{ title: 'Component', headerTitle: 'Component Error' }}
        />
        <Tabs.Screen
          name="api-error"
          options={{ title: 'API', headerTitle: 'Handling API Errors' }}
        />
      </Tabs>
      <StatusBar style="dark" />
    </>
  );
}
