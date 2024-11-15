import { useRouter } from 'expo-router'
import { View, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { statusBarHeight } from '@/app/commons/commons'
import { useState } from 'react'
import Menu from '../Menu/Menu'

export default function NavBar() {
    const route = useRouter()
    const [isOpenMenu, setIsOpenMenu] = useState<Boolean>(false)

    const mainMenu = () => {
        route.navigate("/")
    }

    const handleMenu = () => {
        setIsOpenMenu(true)
    }

    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            top: statusBarHeight,
            padding: 15,
            backgroundColor: "#fff",
            width: Dimensions.get("window").width,
            gap: 20,
            zIndex: 1000
        }}>
            <Icon
                name="menu"
                size={30}
                color="#000"
                onPress={handleMenu}
            />
            <Icon
                name="token"
                size={30}
                color="#000"
                onPress={mainMenu}
            />
            <Icon
                name='search'
                size={30}
                color="#000"
            />
            <View style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "auto",
                gap: 20
            }}>
                <Icon
                    name='person'
                    size={30}
                    color="#000"
                />
                <Icon
                    name='favorite'
                    size={30}
                    color="#000"
                    onPress={() => route.navigate("/components/Favorites/Favorites")}
                />
                <Icon
                    name="shopping-cart"
                    size={30}
                    color="#000"
                />
            </View>
            {isOpenMenu && <Menu setIsOpenMenu={setIsOpenMenu} />}
        </View>
    )
}