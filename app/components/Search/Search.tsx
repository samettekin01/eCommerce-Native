import { useAppDispatch, useAppSelector } from "@/app/redux/store/store"
import { Store } from "@/app/types/types";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Dimensions, StyleSheet, TextInput, View } from "react-native"
import ProductCard from "../ProductCard/ProductCard";
import { getSliderProducts } from "@/app/redux/slices/productsSlice";

export default function Search({ navigation }: any) {

    const { products, sliderProducts } = useAppSelector(state => state.products)

    const [search, setSearch] = useState('');
    const [resultSearch, setResultSearch] = useState<Array<Store>>()

    const getProduct = (id: number) => {
        navigation.navigate('ProductDetail', { id: id });
    }

    useEffect(() => {
        if (search !== "") {
            const searchResult: Store[] = products.filter(item =>
                item.title.toLowerCase().includes(search.toLowerCase())
            );

            setResultSearch((prevResults) => {
                if (JSON.stringify(prevResults) !== JSON.stringify(searchResult)) {
                    return searchResult;
                }
                return prevResults;
            });
        } else {
            setResultSearch(sliderProducts);
        }
    }, [products, search]);

    return (
        <View style={styles.root}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Search"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
            <ScrollView>
                <View style={styles.productsContainer}>
                    {resultSearch && resultSearch.map(item =>
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.productContainer, styles.boxShadow]}
                            activeOpacity={.95}
                            onPress={() => getProduct(item.id)}
                        >
                            <ProductCard data={item} />
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        position: 'relative',
        padding: 10,
        width: Dimensions.get('window').width,
        marginBottom: 60,
        backgroundColor: "#fafafa"
    },
    inputContainer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        shadowColor: '#000',
        shadowRadius: 3.84,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.16,
        elevation: 2
    },
    productsContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        gap: 20,
        paddingBottom: 10,
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
})