import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Favorites from "../components/Favorites/Favorites";
import SignUp from "../components/SignUp/SignUp";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import { Avatar } from "@rneui/themed";
import MainPage from "../components/MainPage/MainPage";
import { getUser, setIsLogoutMenuOpen } from "../redux/slices/statusSlice";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation({ navigation }: { navigation: NavigationProp<any> }) {
    const { isThereUserState, isLogoutMenuOpen } = useAppSelector(state => state.status);
    const dispatch = useAppDispatch()
    const handlePerson = () => {
        if (isThereUserState.name !== undefined) {
            dispatch(setIsLogoutMenuOpen(!isLogoutMenuOpen));
        } else {
            navigation.navigate('SignUp');
        }
    };

    const handleLogout = async () => {
        await AsyncStorage.setItem('user', '');
        dispatch(setIsLogoutMenuOpen(false));
        dispatch(getUser());
        navigation.reset({
            index: 0,
            routes: [{ name: 'Root', params: { screen: 'MainPage' } }],
        })
    }
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
        >
            <Tab.Screen
                name="Home"
                component={MainPage}
                options={{
                    tabBarIcon: () => (<Icon name="home" size={20} />)
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarIcon: () => <Icon name="favorite" size={20} />
                }}
            />
            <Tab.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    tabBarIcon: () => (
                        isThereUserState.name !== undefined || "" ?
                            <Avatar
                                size={30}
                                rounded
                                title={isThereUserState.name.slice(0, 1).toUpperCase()}
                                containerStyle={{ backgroundColor: '#3d4db7' }}
                            /> : <Icon name="person" size={30} color="#000" />
                    )
                }}
            />
        </Tab.Navigator>
    );
}