// app/_layout.tsx

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Oculta headers por defecto para look limpio
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="games/dice" />
    </Stack>
  );
}