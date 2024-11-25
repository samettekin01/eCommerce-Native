import { getCategories } from '@/app/redux/slices/categoriesSlice'
import { useAppDispatch, useAppSelector } from '@/app/redux/store/store'
import { useRouter } from 'expo-router'
import { memo, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'

function Menu({ setIsOpenMenu }: { setIsOpenMenu: any }) {


    const {categories} = useAppSelector(state => state.categories)
    const dispatch = useAppDispatch()

    const route = useRouter()

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    const handlePressOutside = () => {
        setIsOpenMenu(false)
    }

    return (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
            <View style={styles.container}>
                <View style={styles.menuContainer}>
                    <View style={[styles.header, styles.padding]}>
                        <Text style={styles.headerText}>ECommerce</Text>
                    </View>
                    <Text
                        style={[styles.menuText, styles.padding]}
                        onPress={() => {
                            route.navigate("/")
                            setIsOpenMenu(false)
                        }}
                    >
                        Main Menu
                    </Text>
                    {categories ? categories.map(data =>
                        <Text
                            key={data}
                            style={[styles.menuText, styles.padding]}
                            onPress={() => {
                                route.navigate({
                                    pathname: "/components/CategoryProducts/CategoryProducts",
                                    params: {id: data}
                                })
                                setIsOpenMenu(false)
                            }}
                        >{data.toUpperCase()}</Text>).reverse() :
                        <Text>Loading</Text>}
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default memo(Menu)

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        flexDirection: "column",
        top: 0,
        left: 0,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        backgroundColor: "#000000cc"
    },
    menuContainer: {
        display: "flex",
        backgroundColor: "#fff",
        width: "80%",
        height: "100%",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: "#000",
        borderBottomWidth: 2,
        width: "100%"
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
    },
    menuText: {
        fontSize: 16,
        padding: 10,
    },
    padding: {
        padding: 20
    }
})