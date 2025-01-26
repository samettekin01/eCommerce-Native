import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    isOpen: boolean
    isThereUser: {
        name: string,
        email: string,
        pass: string
    },
    isActive: boolean,
    isLogoutMenuOpen: boolean
}

const initialState: InitialState = {
    isOpen: false,
    isThereUser: {
        name: "",
        email: "",
        pass: ""
    },
    isActive: false,
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
        },
        setIsActive: (state, action) => {
            state.isActive = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isThereUser = action.payload
        })
    }
})

export const { singUpStatus, setIsLogoutMenuOpen, setIsActive } = statusSlice.actions
export default statusSlice.reducer