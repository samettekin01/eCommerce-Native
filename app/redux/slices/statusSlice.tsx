import Store from "@/app/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    isOpen: boolean
    userInfo: {
        name: string,
        mail: string,
        pass: string
    },
    isLogoutMenuOpen: boolean,
    basket: Store[]
}

const initialState: InitialState = {
    isOpen: false,
    userInfo: {
        name: "",
        mail: "",
        pass: ""
    },
    isLogoutMenuOpen: false,
    basket: []
}

export const getUser = createAsyncThunk("user", async () => {
    const userString = await AsyncStorage.getItem('user')
    const user = userString ? JSON.parse(userString) : {}
    return user
})

export const getBasket = createAsyncThunk("basket", async () => {
    try {
        const basketString = await AsyncStorage.getItem("basket")
        if (basketString) {
            return JSON.parse(basketString || '[]')
        }
    } catch (e) {
        console.error("Error fetching basket: ", e)
        return []
    }
})

const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {
        singUpStatus: state => {
            state.isOpen = !state.isOpen
        },
        setIsLogoutMenuOpen: (state, action) => {
            state.isLogoutMenuOpen = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.userInfo = action.payload
        })
        builder.addCase(getBasket.fulfilled, (state, action) => {
            state.basket = action.payload
        })
    }
})

export const { singUpStatus, setIsLogoutMenuOpen } = statusSlice.actions
export default statusSlice.reducer