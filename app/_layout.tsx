import { Stack } from "expo-router";
import "./global.css";
import { StatusBar } from "react-native";
import { AlertNotificationRoot } from "react-native-alert-notification";

export default function RootLayout() {
  return (
    <AlertNotificationRoot>
      <StatusBar hidden />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movies/[id]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/sign-up" options={{ headerShown: false }} />
      </Stack>
    </AlertNotificationRoot>
  );
}
