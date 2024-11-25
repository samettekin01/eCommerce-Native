import { memo, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useAppDispatch, useAppSelector } from "@/app/redux/store/store"
import { getCategory } from "@/app/redux/slices/productsSlice"
import ProductCard from "../ProductCard/ProductCard"
import statusBarHeight from "@/app/commons/commons"

function CategoryProducts() {

    const { id } = useLocalSearchParams()
    const route = useRouter()

    const { category } = useAppSelector(state => state.products)
    const dispatch = useAppDispatch()

    const getProduct = (id: number) => {
        route.navigate({
            pathname: "/components/ProductCardDetail/ProductCardDetail",
            params: { id: id }
        })
    }

    useEffect(() => {
        if (typeof id === 'string') {
            dispatch(getCategory(id))
        }
    }, [id, dispatch])

    return (

        <ScrollView
            style={{ backgroundColor: "#f2f2f2", marginTop: (statusBarHeight() || 0) + 60 }}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.productsContainer}>
                {category ? category.map(data =>
                    <TouchableOpacity
                        key={data.id}
                        style={[styles.productContainer, styles.boxShadow]}
                        activeOpacity={.95}
                        onPress={() => getProduct(data.id)}
                    >
                        <ProductCard data={data} />
                    </TouchableOpacity>
                ) : <Text>Not loading</Text>}
            </View>
        </ScrollView>
    )
}

export default memo(CategoryProducts)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30
    },
    text: {
        color: "white",
        fontSize: 30,
        fontWeight: "700"
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
    productTitle: {
        textAlign: "center",
        color: "#000",
        margin: 1,
        fontSize: 12
    },
    productImage: {
        width: "70%",
        height: 200,
        resizeMode: "center"
    },
    productPrice: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 10,
        alignItems: "center",
        marginTop: 10,
    },
    productPriceText: {
        color: "#fa5502",
        fontSize: 20,
        fontWeight: "bold"
    },
    sliderItemContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: "100%",
    },
    sliderImage: {
        width: "50%",
        height: "100%",
        resizeMode: 'contain',
    },
})