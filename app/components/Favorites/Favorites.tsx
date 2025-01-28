import { Store } from '@/app/types/types'
import { memo, useCallback, useEffect, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ProductCard from '../ProductCard/ProductCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import statusBarHeight from '@/app/commons/commons'

function Favorites() {

    const [favorites, setFavorites] = useState<Store[]>([])
    const route = useRouter()

    const getFavorites = useCallback(async () => {
        try {
            const getFavorite = await AsyncStorage.getItem("favorites")
            const getList = JSON.parse(getFavorite || '[]')
            setFavorites(getList)
        } catch (e) {
            alert(e)
        }
    }, [])

    const getProduct = (id: number) => {
        route.navigate({
            pathname: "/components/ProductCardDetail/ProductCardDetail",
            params: { id: id }
        })
    }

    useEffect(() => {
        getFavorites()
    }, [getFavorites])

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <View style={styles.productsContainer}>
                {favorites && favorites?.length > 0 ? favorites.map(d =>
                    <TouchableOpacity
                        key={d.id}
                        style={[styles.productContainer, styles.boxShadow]}
                        activeOpacity={.95}
                        onPress={() => getProduct(d.id)}
                    >
                        <ProductCard data={d} />
                    </TouchableOpacity>
                ) :
                    <View style={styles.noProduct}>
                        <Text style={styles.noProductText}> No products in favorites</Text>
                    </View>
                }
            </View >
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get("window").width,
        marginTop: (statusBarHeight() || 0) + 60,
        padding: 8,
        backgroundColor: "#fff",
    },
    productsContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        gap: 20,
        margin: 4
    },
    productContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        width: "45%",
        height: "auto",
        borderRadius: 10,
        padding: 10,
    },
    boxShadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.16,
        shadowRadius: 1.51,
        elevation: 2
    },
    noProduct: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: 20,
        borderRadius: 5,
        backgroundColor: "#8ebde6"
    },
    noProductText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    }
})

export default memo(Favorites)