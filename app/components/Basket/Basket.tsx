import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { memo, useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/redux/store/store'
import { calculateGrandTotal, calculateTotal } from '@/app/redux/slices/shopSlice'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ListItem } from '@rneui/themed'
import { Avatar, Button } from '@rneui/base'
import statusBarHeight from '@/app/commons/commons'
import { Store } from '@/app/types/types'

const Basket = () => {
    const [basket, setBasket] = useState<Store[]>([])
    const grandT = useAppSelector(state => state.shop.grandTotal)
    const dispatch = useAppDispatch()

    const handleBasket = useCallback(async () => {
        try {
            const basketString = await AsyncStorage.getItem("basket")
            if (basketString) {
                setBasket(JSON.parse(basketString || '[]'))
                dispatch(calculateTotal())
                dispatch(calculateGrandTotal())
            }
        } catch (e) {
            console.error("Error fetching basket: ", e)
            setBasket([])
        }
    }, [])

    const productDelete = async (id: number) => {
        try {
            const basketString = await AsyncStorage.getItem("basket")
            if (basketString) {
                const getBasket: Store[] = JSON.parse(basketString || '[]')
                const index = getBasket.findIndex(item => item.id === id)
                getBasket.splice(index, 1)
                await AsyncStorage.setItem("basket", JSON.stringify(getBasket))
                setBasket(getBasket)
                dispatch(calculateTotal())
                dispatch(calculateGrandTotal())
            }
            if (basket?.findIndex(item => item.id > 0) === -1) {
                await AsyncStorage.removeItem("basket")
            }
        } catch (e) {
            console.log(e)
        }
    }

    const basketDone = async () => {
        try {
            const basketString = await AsyncStorage.getItem("basket")
            if (basketString) {
                await AsyncStorage.removeItem("basket")
                setBasket([])
                dispatch(calculateTotal())
                dispatch(calculateGrandTotal())
            }
        } catch (e) {
            console.log(e)
        }
    }

    const increment = async (id: number) => {
        try {
            if (basket) {
                const product = basket?.find(item => item.id === id)
                if (product && product.amount !== undefined) {
                    product.amount += 1
                    product.total = product.amount * product.price
                }
                await AsyncStorage.setItem("basket", JSON.stringify(basket))
                setBasket(basket)
                dispatch(calculateTotal())
                dispatch(calculateGrandTotal())
            }
        } catch (e) {
            console.log(e)
        }
    }

    const decrement = async (id: number) => {
        try {
            if (basket) {
                const product = basket?.find(item => item.id === id)
                if (product && product.amount !== undefined && product.amount !== 1) {
                    product.amount -= 1
                    product.total = product.amount * product.price
                }
                await AsyncStorage.setItem("basket", JSON.stringify(basket))
                setBasket(basket)
                dispatch(calculateTotal())
                dispatch(calculateGrandTotal())
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        handleBasket()
    }, [handleBasket])

    return (
        <View style={styles.container}>
            {basket.length > 0 ? (
                <>
                    <FlatList
                        data={basket}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <View
                                style={styles.itemContainer}>
                                <TouchableOpacity onPress={() => decrement(item.id)}>
                                    <Icon name="arrow-left" size={30} />
                                </TouchableOpacity>
                                <Text style={styles.amount}>{item.amount}</Text>
                                <TouchableOpacity onPress={() => increment(item.id)}>
                                    <Icon name="arrow-right" size={30} />
                                </TouchableOpacity>
                                <Avatar
                                    rounded
                                    source={{ uri: item.image }}
                                />
                                <ListItem.Content>
                                    <ListItem.Title>{item.title}</ListItem.Title>
                                    <ListItem.Subtitle>
                                        <Text style={{ fontWeight: "bold" }}>Total:</Text>{item.total} $
                                    </ListItem.Subtitle>
                                </ListItem.Content>
                                <TouchableOpacity onPress={() => productDelete(item.id)}>
                                    <Icon name='delete' size={20} />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    <Text style={styles.totalText}>
                        {grandT.toFixed(2)} $
                    </Text>
                    <Button
                        title="Done"
                        onPress={basketDone}
                    />
                </>
            ) :
                <View style={styles.infoText}>
                    <Text>Not found product</Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: '#fff',
        marginTop: (statusBarHeight() || 0) + 60,
        width: Dimensions.get("window").width
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    },
    amount: {
        fontSize: 16
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    infoText: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: Dimensions.get("window").width
    }
});

export default memo(Basket)
