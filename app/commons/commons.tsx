import { Platform, StatusBar } from "react-native";

export const statusBarHeight = Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0