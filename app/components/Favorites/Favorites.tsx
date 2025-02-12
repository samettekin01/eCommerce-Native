import { useCallback, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ProductCard from '../ProductCard/ProductCard'
import { NavigationProp } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '@/app/redux/store/store'
import { getFavorites } from '@/app/redux/slices/favoritesSlice'

export default function Favorites({ navigation }: { navigation: NavigationProp<any> }) {

    const { favorites } = useAppSelector(state => state.favorites)
    const dispatch = useAppDispatch()

    const getProduct = (id: number) => {
        navigation.navigate('Root', { screen: 'ProductDetail', params: { id: id } });
    }

    useEffect(() => {
        dispatch(getFavorites())
    }, [dispatch])

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}

        >
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
                        <Text style={styles.noProductText}>No products in favorites</Text>
                    </View>
                }
            </View >
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        padding: 8,
        backgroundColor: "#f2f2f2"
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