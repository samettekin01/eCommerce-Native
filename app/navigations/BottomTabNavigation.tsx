import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Favorites from "../components/Favorites/Favorites";
import MainPage from "../components/MainPage/MainPage";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
        >
            <Tab.Screen
                name="Home"
                component={MainPage}
                options={{
                    tabBarActiveBackgroundColor: "#f2f2f2",
                    tabBarActiveTintColor: '#000',
                    tabBarIcon: () => (<Icon name="home" size={20} />)
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarActiveBackgroundColor: "#f2f2f2",
                    tabBarActiveTintColor: '#000',
                    tabBarIcon: () => <Icon name="favorite" size={20} />
                }}
            />
            
        </Tab.Navigator>
    );
}