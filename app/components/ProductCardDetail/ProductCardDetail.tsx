import { Image, ScrollView, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Store } from '../../types/store'
import { AirbnbRating } from '@rneui/themed'
import { statusBarHeight } from '@/app/commons/commons'
import { Button } from '@rneui/base'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function ProductCardDetail() {
    const { id } = useLocalSearchParams()
    const [product, setProduct] = useState<Store>()

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(json => setProduct(json))
            .catch(e => alert(e))
    }, [id])
    return (
        <View style={{ flex: 1, backgroundColor: "#fff", marginTop: statusBarHeight + 60 }}>
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
                                source={{ uri: product.image }}
                            />
                        </View>
                        <View style={{ marginLeft: "auto", marginRight: 20 }}>
                            <AirbnbRating
                                count={5}
                                defaultRating={product.rating.rate}
                                isDisabled
                                size={20}
                            />
                        </View>
                        <Text
                            style={{ fontSize: 24 }}
                        >{product.title}</Text>
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
                            {product.description}
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
                    />
                    <Icon color="#0051d4" size={30} name="favorite-border" />
                </View>
            </View>
        </View>
    )
}