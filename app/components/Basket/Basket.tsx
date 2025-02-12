import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { useCallback, useEffect, useState, useMemo } from 'react'
import { useAppDispatch } from '@/app/redux/store/store'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ListItem, useTheme } from '@rneui/themed'
import { Avatar, Badge, Button } from '@rneui/base'
import { Store } from '@/app/types/types'
import React from 'react'
import { getBasket } from '@/app/redux/slices/statusSlice'

const Basket = () => {
    const [basket, setBasket] = useState<Store[]>([])
    const [grandT, setGrandT] = useState<number>(0)

    const dispatch = useAppDispatch()

    const { theme } = useTheme()

    const handleBasket = async () => {
        try {
            const basketString = await AsyncStorage.getItem("basket")
            if (basketString) {
                setBasket(JSON.parse(basketString || '[]'))
                calculateGrandTotal()
                dispatch(getBasket())
            }
        } catch (e) {
            console.error("Error fetching basket: ", e)
            setBasket([])
        }
    }

    const productDelete = useCallback(async (id: number) => {
        try {
            const basketString = await AsyncStorage.getItem("basket")
            if (basketString) {
                const arrayBasket: Store[] = JSON.parse(basketString || '[]')
                const index = arrayBasket.findIndex(item => item.id === id)
                arrayBasket.splice(index, 1)
                await AsyncStorage.setItem("basket", JSON.stringify(arrayBasket))
                setBasket(arrayBasket)
                calculateGrandTotal()
                dispatch(getBasket())
            }
            if (basket?.findIndex(item => item.id > 0) === -1) {
                await AsyncStorage.removeItem("basket")
            }
        } catch (e) {
            console.log(e)
        }
    }, [basket, dispatch])

    const increment = async (id: number) => {
        try {
            if (basket) {
                const product = basket?.find(item => item.id === id)
                if (product && product.amount !== undefined) {
                    product.amount += 1
                    product.total = product.amount * product.price
                }
                await AsyncStorage.setItem("basket", JSON.stringify(basket))
                setBasket([...basket])
                calculateGrandTotal()
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
                setBasket([...basket])
                calculateGrandTotal()
            }
        } catch (e) {
            console.log(e)
        }
    }

    const calculateGrandTotal = async () => {
        try {
            const result = await AsyncStorage.getItem("basket")
            if (result) {
                const getBasket: Store[] = JSON.parse(result)
                setGrandT(getBasket.map((data) => data.total ?? 0)
                    .reduce<number>((prev, cur) => prev + cur, 0))
            }
            return 0
        } catch (e) {
            console.log(`Error parsing basket data: ${e}`)
            return 0
        }
    }

    const basketDone = useCallback(async () => {
        try {
            const basketString = await AsyncStorage.getItem("basket")
            if (basketString) {
                await AsyncStorage.removeItem("basket")
                setBasket([])
                calculateGrandTotal()
                dispatch(getBasket())
            }
        } catch (e) {
            console.log(e)
        }
    }, [dispatch])

    useEffect(() => {
        handleBasket()
    }, [handleBasket])

    const renderItem = useCallback(({ item }: { item: Store }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => decrement(item.id)}>
                <Icon name="arrow-left" size={30} />
            </TouchableOpacity>
            <Badge value={item.amount} />
            <TouchableOpacity onPress={() => increment(item.id)}>
                <Icon name="arrow-right" size={30} />
            </TouchableOpacity>
            <Avatar rounded source={{ uri: item.image }} />
            <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
                <ListItem.Subtitle>
                    <Text style={{ fontWeight: "bold" }}>Total:</Text>{item.total} $
                </ListItem.Subtitle>
            </ListItem.Content>
            <TouchableOpacity onPress={() => productDelete(item.id)}>
                <Icon name='delete' size={20} style={{ color: theme.colors.primary, marginRight: 10 }} />
            </TouchableOpacity>
        </View>
    ), [decrement, increment, productDelete, theme.colors.primary])

    const memoizedBasket = useMemo(() => basket, [basket])

    return (
        <View style={styles.container}>
            {memoizedBasket.length > 0 ?
                <>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Amount</Text>
                        <Text style={styles.titleText}>Product Name</Text>
                        <Text style={styles.titleText}>Delete</Text>
                    </View>
                    <FlatList
                        data={memoizedBasket}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderItem}
                    />
                    <Text style={styles.totalText}>
                        Total:  {grandT.toFixed(2)} $
                    </Text>
                    <Button title="Done" onPress={basketDone} />
                </>
                :
                <View style={styles.noProduct}>
                    <Text style={styles.noProductText}> No products in basket</Text>
                </View>
            }
        </View>
    )
}

export default React.memo(Basket)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: "#f2f2f2"
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 8,
        paddingTop: 8,
    },
    titleText: {
        textAlign: 'center',
        fontSize: 16,
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        paddingBottom: 8,
        paddingTop: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 16,
        borderTopWidth: 1,
        paddingTop: 8,
        borderTopColor: '#ccc',
        textAlign: "right"
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