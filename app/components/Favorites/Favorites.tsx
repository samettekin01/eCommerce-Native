import { Store } from '@/app/types/store'
import { useCallback, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ProductCard from '../ProductCard/ProductCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { statusBarHeight } from '@/app/commons/commons'

function Favorites() {

    const [favorites, setFavorites] = useState<Store[]>()
    const route = useRouter()

    const getFavorites = useCallback(async () => {
        const getFavorite = await AsyncStorage.getItem("favorites")
        const getList = JSON.parse(getFavorite || '""') || []
        setFavorites(getList)
    }, [favorites])

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
        <ScrollView
            style={{ backgroundColor: "#f2f2f2", marginTop: statusBarHeight + 60 }}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
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
                            <Text style={styles.noProductText}>Not found favorite</Text>
                        </View>
                    }
                </View>
            </View >
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30
    },
    productsContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        gap: 20,
        margin: 4,

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

export default Favorites