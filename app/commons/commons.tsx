import { Platform, StatusBar } from "react-native";

const statusBarHeight = Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0;

const StatusBarHeightComponent = () => {
    return statusBarHeight; 
}

export default StatusBarHeightComponent; 