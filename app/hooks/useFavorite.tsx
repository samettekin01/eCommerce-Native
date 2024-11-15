import { useCallback, useEffect, useState } from "react"
import { Store } from "../types/store"
import AsyncStorage from "@react-native-async-storage/async-storage"

export function useFavorite(product?: Store) {
    const [favorite, setFavorite] = useState()

    const handleFavorite = async () => {
        const getFavorite = await AsyncStorage.getItem("favorites")
        const getFav = JSON.parse(getFavorite || '""') || []
        const productList = product
        const findProduct = getFav.findIndex((item: Store) => item.id === product?.id)
        if (!getFav && getFav[0] === null) {
            AsyncStorage.setItem("favorites", JSON.stringify(product))
        } else if (findProduct === -1) {
            getFav && getFav.push(productList)
            AsyncStorage.setItem("favorites", JSON.stringify(getFav))
        } else {
            getFav.splice(findProduct, 1)
            AsyncStorage.setItem("favorites", JSON.stringify(getFav))
        }
        favoriteStatus()
    }

    const favoriteStatus = useCallback(async () => {
        const getFavorite = await AsyncStorage.getItem("favorites")
        const getList = JSON.parse(getFavorite || '""') || []
        if (getList) {
            setFavorite(getList.findIndex((item: Store) => item.id === product?.id))
        }
    }, [product?.id])

    useEffect(() => {
        favoriteStatus()
    }, [favoriteStatus])
    return { handleFavorite, favorite }
}