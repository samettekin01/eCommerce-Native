import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface InitialState {
    categories: Array<string>
}

const initialState: InitialState = {
    categories: []
}

export const getCategories = createAsyncThunk("category", async () => {
    const response = await fetch("https://fakestoreapi.com/products/categories")
    
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    
    const data = await response.json()
    return data
})

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload
        })
    }
})

export default categorySlice.reducer
