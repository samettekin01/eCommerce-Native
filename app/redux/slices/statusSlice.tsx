import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    isOpen: boolean
    userInfo: {
        name: string,
        mail: string,
        pass: string
    },
    isLogoutMenuOpen: boolean
}

const initialState: InitialState = {
    isOpen: false,
    userInfo: {
        name: "",
        mail: "",
        pass: ""
    },
    isLogoutMenuOpen: false
}

export const getUser = createAsyncThunk("user", async () => {
    const userString = await AsyncStorage.getItem('user')
    const user = userString ? JSON.parse(userString) : {}
    return user
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
    }
})

export const { singUpStatus, setIsLogoutMenuOpen } = statusSlice.actions
export default statusSlice.reducer