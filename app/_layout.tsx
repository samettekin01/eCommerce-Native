import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import NavBar from "./components/NavBar/NavBar";
import { Provider } from "react-redux";
import store from "./redux/store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="components/Favorites/Favorites" />
        <Stack.Screen name="components/Basket/Basket" />
      </Stack>
      <StatusBar backgroundColor="#fff" />
      <NavBar />
    </Provider>
  );
}