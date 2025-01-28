import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Store } from "@/app/types/types"

interface InitialState {
    total: number
    grandTotal: number
    amountTotal: number
}

const initialState: InitialState = {
    total: 0,
    grandTotal: 0,
    amountTotal: 0
}

export const calculateTotal = createAsyncThunk<number>("shop/calculateTotal", async () => {
    try {
        const result = await AsyncStorage.getItem("basket")
        if (result) {
            const list: Store[] = JSON.parse(result)
            return list
                .map((item) => item.amount ?? 0)
                .reduce<number>((prev, cur) => prev + cur, 0)
        }
        return 0
    } catch (e) {
        console.log(`Error parsing basket data: ${e}`)
        return 0
    }
})

export const calculateGrandTotal = createAsyncThunk<number>("shop/calculateGrandTotal", async () => {
    try {
        const result = await AsyncStorage.getItem("basket")
        if (result) {
            const getBasket: Store[] = JSON.parse(result)
            return getBasket
                .map((data) => data.total ?? 0)
                .reduce<number>((prev, cur) => prev + cur, 0)
        }
        return 0
    } catch (e) {
        console.log(`Error parsing basket data: ${e}`)
        return 0
    }
})

export const calculateAmountTotal = createAsyncThunk<number>("shop/calculateAmountTotal", async () => {
    try {
        const result = await AsyncStorage.getItem("basket")
        if (result) {
            const getBasket: Store[] = JSON.parse(result)
            return getBasket
                .map(data => data.amount ?? 0)
                .reduce((prev, cur) => (prev! + cur!), 0)
        }
        return 0
    } catch (e) {
        console.log(`Error parsing basket data: ${e}`)
        return 0
    }
})


export const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(calculateTotal.fulfilled, (state, action) => {
                state.total = action.payload
            })
            .addCase(calculateGrandTotal.fulfilled, (state, action) => {
                state.grandTotal = action.payload
            })
            .addCase(calculateAmountTotal.fulfilled, (state, action) => {
                state.amountTotal = action.payload
            })
    },
})

export default shopSlice.reducer