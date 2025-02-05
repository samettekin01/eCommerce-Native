import { useEffect } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { Store } from '../../types/types'
import { Button } from '@rneui/base'
import Icon from 'react-native-vector-icons/MaterialIcons'
import useFavorite from '@/app/hooks/useFavorite'
import { useAppDispatch, useAppSelector } from '@/app/redux/store/store'
import { calculateAmountTotal, calculateTotal } from '@/app/redux/slices/shopSlice'
import { getDetailProduct } from '@/app/redux/slices/productsSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ProductCardDetail({ route }: any) {
    const dispatch = useAppDispatch()
    const { productDetail } = useAppSelector<any>(state => state.products)

    const { id } = route.params

    const { handleFavorite, favorite } = useFavorite(productDetail)

    const product: Store = {
        id: productDetail.id,
        category: productDetail.category,
        title: productDetail.title,
        price: productDetail.price,
        amount: 1,
        total: productDetail.price,
        image: productDetail.image
    }

    const addBasket = async () => {
        try {
            const basketString = await AsyncStorage.getItem("basket")
            if (basketString) {
                const basket: Store[] = JSON.parse(basketString)
                const productID = basket.find(item => item.id === productDetail.id)
                if (productID && productID.amount !== undefined) {
                    productID.amount += 1
                    productID.total = productID.amount * productDetail.price
                } else {
                    basket.push(product)
                }
                await AsyncStorage.setItem("basket", JSON.stringify([...basket]))
            } else {
                await AsyncStorage.setItem("basket", JSON.stringify([product]))
            }
            dispatch(calculateTotal())
            dispatch(calculateAmountTotal())
        } catch (e) {
            alert(e)
        }
    }

    useEffect(() => {
        dispatch(getDetailProduct(id))
    }, [dispatch, id])

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView
                style={{
                    padding: 10,
                }}
                contentContainerStyle={{
                    paddingBottom: 90
                }}
            >
                {product ?
                    <View>
                        <View style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingBottom: 20
                        }}>
                            <Image
                                style={{
                                    width: "100%",
                                    height: 300,
                                    resizeMode: "contain"
                                }}
                                source={{ uri: productDetail.image }}
                            />
                        </View>
                        {/* <View style={{ marginLeft: "auto", marginRight: 20 }}>
                            <AirbnbRating
                                count={5}
                                defaultRating={productDetail.rating?.rate}
                                isDisabled
                                size={20}
                            />
                        </View> */}
                        <Text
                            style={{ fontSize: 24 }}
                        >{productDetail.title}</Text>
                        <View style={{
                            width: "100%",
                            backgroundColor: "#fc7f03",
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingLeft: 2,
                            marginTop: 10,
                            marginBottom: 10
                        }}
                        >
                            <Text style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "#fff"
                            }}>
                                Description:
                            </Text>
                        </View>
                        <Text
                            style={{ fontSize: 16 }}
                        >
                            {productDetail.description}
                        </Text>
                    </View>
                    :
                    <Text>Loading</Text>
                }
            </ScrollView>
            <View style={{
                display: "flex",
                flexDirection: "row",
                position: "absolute",
                bottom: 0,
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 15,
                backgroundColor: "#fff"
            }}>
                <Text style={{ fontSize: 30, color: "#fa5502" }}>{product?.price} $</Text>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10
                }}>
                    <Button
                        title="Add Basket"
                        color="#0051d4"
                        titleStyle={{
                            fontSize: 20,
                            padding: 15
                        }}
                        onPress={addBasket}
                    />
                    <Icon
                        color="#0051d4"
                        size={30}
                        name={favorite !== -1 ? "favorite" : "favorite-border"}
                        onPress={handleFavorite}
                    />
                </View>
            </View>
        </View>
    )
}