import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from "react-native"
import { useAppDispatch, useAppSelector } from "@/app/redux/store/store"
import { getCategory } from "@/app/redux/slices/productsSlice"
import ProductCard from "../ProductCard/ProductCard"
import { NavigationProp, useFocusEffect } from "@react-navigation/native"
import Loading from "@/app/commons/Loading"

export default function CategoryProducts({ navigation, route }: { navigation: NavigationProp<any>, route: any }) {

    const { title } = route.params

    const dispatch = useAppDispatch()
    const { category, categoryStatus } = useAppSelector(state => state.products)

    const getProduct = (id: number) => {
        navigation.navigate("MainPage", {
            screen: "ProductDetail",
            params: { id: id }
        })
    }

    const fetchData = useCallback(() => {
        dispatch(getCategory(title));
    }, [title, dispatch]);

    useFocusEffect(useCallback(() => {
        fetchData();
    }, [fetchData])
    );
    return (

        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title.charAt(0).toUpperCase() + title.slice(1)}</Text>
            </View>
            {categoryStatus === "Success" ?
                <FlatList
                    style={styles.container}
                    data={category}
                    numColumns={2}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.productContainer, styles.boxShadow]}
                            activeOpacity={.95}
                            onPress={() => getProduct(item.id)}
                        >
                            <ProductCard data={item} />
                        </TouchableOpacity>
                    }
                    keyExtractor={(item) => item.id.toString()} />
                :
                <Loading />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 30,
        width: "100%",
        height: "100%",
        backgroundColor: "#f2f2f2",
    },
    text: {
        color: "white",
        fontSize: 30,
        fontWeight: "700"
    },
    titleContainer: {
        alignItems: "center",
        width: Dimensions.get("window").width,
        padding: 10,
        backgroundColor: "#f2f2f2",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
    },
    productsContainer: {
        flex: 1,
        gap: 5,
        margin: 10,
    },
    productContainer: {
        display: "flex",
        width: Dimensions.get("window").width / 2.2,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
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
        elevation: 2,
        margin: 10,
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
    loadingContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    }
})