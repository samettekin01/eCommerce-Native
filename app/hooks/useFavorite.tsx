import { useCallback, useEffect, useState } from "react"
import { Store } from "../types/types"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function useFavorite(product?: Store) {
    const [favorite, setFavorite] = useState()

    const handleFavorite = async () => {
        try {
            const getFavorite = await AsyncStorage.getItem("favorites")
            const getFav = JSON.parse(getFavorite || '[]') || []
            const productList = product || []
            const findProduct = getFav.findIndex((item: Store) => item.id === product?.id)
            if (!getFav && getFav[0] === null) {
                await AsyncStorage.setItem("favorites", JSON.stringify(product))
            } else if (findProduct === -1) {
                getFav && getFav.push(productList)
                await AsyncStorage.setItem("favorites", JSON.stringify(getFav))
            } else {
                getFav.splice(findProduct, 1)
                await AsyncStorage.setItem("favorites", JSON.stringify(getFav))
            }
            favoriteStatus()
        } catch (e) {
            alert(e)
        }
    }

    const favoriteStatus = useCallback(async () => {
        try {
            const getFavorite = await AsyncStorage.getItem("favorites")
            const getList = JSON.parse(getFavorite || '[]') 
            if (getList) {
                setFavorite(getList.findIndex((item: Store) => item.id === product?.id))
            }
        } catch (e) {
            alert(e)
        }
    }, [product?.id])

    useEffect(() => {
        favoriteStatus()
    }, [favoriteStatus])
    
    return { handleFavorite, favorite }
}