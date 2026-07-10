import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      {/* Esto configura la pantalla principal y oculta la barra superior por defecto */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}