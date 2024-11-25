import { useRouter } from 'expo-router'
import { View, Dimensions, TouchableOpacity } from 'react-native'
import { memo, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import statusBarHeight from '@/app/commons/commons'
import Menu from '@/app/components/Menu/Menu'

function NavBar() {
    const route = useRouter()
    const [isOpenMenu, setIsOpenMenu] = useState<Boolean>(false)

    const handleMenu = () => {
        setIsOpenMenu(true)
    }

    return (
        <View style={{
            flexDirection: "row",
            position: "absolute",
            top: (statusBarHeight() || 0),
            padding: 15,
            backgroundColor: "#fff",
            width: Dimensions.get("window").width,
            gap: 20,
            zIndex: 1000
        }}>
            <TouchableOpacity onPress={handleMenu}>
                <Icon
                    name="menu"
                    size={30}
                    color="#000"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => route.navigate("/")}>
                <Icon
                    name="token"
                    size={30}
                    color="#000"
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon
                    name='search'
                    size={30}
                    color="#000"
                />
            </TouchableOpacity>
            <View style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "auto",
                gap: 20
            }}>
                <TouchableOpacity>
                    <Icon
                        name='person'
                        size={30}
                        color="#000"
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => route.navigate("/components/Favorites/Favorites")}>
                    <Icon
                        name='favorite'
                        size={30}
                        color="#000"
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => route.navigate("/components/Basket/Basket")}>
                    <Icon
                        name="shopping-cart"
                        size={30}
                        color="#000"
                    />
                </TouchableOpacity>
            </View>
            {isOpenMenu && <Menu setIsOpenMenu={setIsOpenMenu} />}
        </View>
    )
}

export default memo(NavBar)