import { Image, StyleSheet, Text, View } from 'react-native'
import useFavorite from '@/app/hooks/useFavorite'
import { Store } from '@/app/types/types'
import Icon from 'react-native-vector-icons/AntDesign'

export default function ProductCard({ data }: { data: Store }) {

    const { handleFavorite, favorite } = useFavorite(data)

    return (
        <View style={styles.productContainer}>
            <Image
                style={styles.productImage}
                source={{ uri: data.image }}
            />
            <Text style={styles.productTitle}>{data.title}</Text>
            <View style={styles.productPrice}>
                <Icon
                    name={favorite !== -1 ? "heart" : "hearto"}
                    size={20}
                    color="#456aff"
                    onPress={handleFavorite}
                />
                <Text style={styles.productPriceText}>{data.price} $</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    productContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        width: "100%",
        height: "auto"
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
    }
})