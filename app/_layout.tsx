import { Stack } from "expo-router"
import { StatusBar } from 'expo-status-bar'
import NavBar from "./components/NavBar/NavBar"

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar backgroundColor="#fff" />
      <NavBar />
    </>
  )
}