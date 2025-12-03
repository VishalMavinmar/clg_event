import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack initialRouteName="signup">
      <Stack.Screen name="signup" options={{ title: "Signup" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="home" options={{ title: "Home" }} />
      <Stack.Screen name="searchstudent" options={{ title: "Search Student" }} />
    </Stack>
  );
}
