import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";

const RootLayout = () => {
  return (
    <>
      <Stack screenOptions={{
        headerShown: false,
        statusBarHidden: true,
      }}>
        <Stack.Screen 
          name="index"
        />
      </Stack>
      <StatusBar hidden={true} />
    </>
  );
}

export default RootLayout;