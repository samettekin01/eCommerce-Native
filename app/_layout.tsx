import { Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from 'expo-status-bar';
import { Provider } from "react-redux";
import store from "./redux/store/store";
import NavBar from "./components/NavBar/NavBar";
import { ThemeProvider } from "@rneui/themed";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="components/Favorites/Favorites" />
          <Stack.Screen name="components/Basket/Basket" />
          <Stack.Screen name="components/SignUp/SignUp" />
          <Drawer />
        </Stack>
        <StatusBar backgroundColor="#fff" />
        <NavBar />
      </ThemeProvider>
    </Provider>
  );
}