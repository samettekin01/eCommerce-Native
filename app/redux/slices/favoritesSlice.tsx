import Store from "@/app/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    favorites: Store[]
}

const initialState: InitialState = {
    favorites: [],
}


export const getFavorites = createAsyncThunk("favorites", async () => {
    const getFavorite = await AsyncStorage.getItem("favorites")
    const getList = JSON.parse(getFavorite || '[]')
    return getList
})


const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFavorites.fulfilled, (state, action) => {
            state.favorites = action.payload
        });
    }
})

export default favoritesSlice.reducer