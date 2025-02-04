import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Favorites from "../components/Favorites/Favorites";
import Search from "../components/Search/Search";
import SignUp from "../components/SignUp/SignUp";
import { useAppSelector } from "../redux/store/store";
import { Avatar } from "@rneui/themed";
import Basket from "../components/Basket/Basket";
import ProductCardDetail from "../components/ProductCardDetail/ProductCardDetail";
import MainPage from "../components/MainPage/MainPage";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
    const { isThereUser } = useAppSelector(state => state.status);

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
                        isThereUser.name !== undefined || "" ?
                            <Avatar
                                size={30}
                                rounded
                                title={isThereUser.name.slice(0, 1).toUpperCase()}
                                containerStyle={{ backgroundColor: '#3d4db7' }}
                            /> : <Icon name="person" size={30} color="#000" />
                    )
                }}
            />
            <Tab.Screen
                name="Basket"
                component={Basket}
                options={{
                    tabBarItemStyle: { display: 'none' }
                }} />
            <Tab.Screen
                name="ProductDetail"
                component={ProductCardDetail}
                options={{
                    tabBarItemStyle: { display: 'none' }
                }} />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarItemStyle: { display: 'none' }
                }} />
        </Tab.Navigator>
    );
}
