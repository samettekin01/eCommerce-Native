import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Store } from "@/app/types/types"

interface InitialState {
    products: Store[],
    productsStatus: string,
    productDetail?: Store[],
    productDetailStatus: string
    category: Store[],
    categoryStatus: string,
    sliderProducts: Store[],
    sliderProductsStatus: string
}

const initialState: InitialState = {
    products: [],
    productsStatus: "",
    productDetail: [],
    productDetailStatus: "",
    category: [],
    categoryStatus: "",
    sliderProducts: [],
    sliderProductsStatus: ""
}

export const getProducts = createAsyncThunk("products", async () => {
    const response = await fetch("https://fakestoreapi.com/products/")
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
})

export const getDetailProduct = createAsyncThunk("productDetail", async (id: number) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
})
export const getCategory = createAsyncThunk("categories", async (id: string) => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${id}`)
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
})

export const getSliderProducts = createAsyncThunk("sliderProducts", async () => {
    const response = await fetch(`https://fakestoreapi.com/products?limit=5`)
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
})

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.productsStatus = "Loading"
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.productsStatus = "Success"
            })
            .addCase(getProducts.rejected, (state) => {
                state.productsStatus = "Fail"
            })
            .addCase(getDetailProduct.pending, (state) => {
                state.productDetailStatus = "Loading"
            })
            .addCase(getDetailProduct.fulfilled, (state, action) => {
                state.productDetail = action.payload
                state.productDetailStatus = "Success"
            })
            .addCase(getDetailProduct.rejected, (state) => {
                state.productDetailStatus = "Fail"
            })
            .addCase(getCategory.pending, (state) => {
                state.categoryStatus = "Loading"
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.categoryStatus = "Success"
                state.category = action.payload
            })
            .addCase(getCategory.rejected, (state) => {
                state.categoryStatus = "Fail"
            })
            .addCase(getSliderProducts.fulfilled, (state, action) => {
                state.sliderProducts = action.payload
                state.sliderProductsStatus = "Success"
            })
            .addCase(getSliderProducts.pending, (state) => {
                state.categoryStatus = "Loading"
            })
            .addCase(getSliderProducts.rejected, (state) => {
                state.categoryStatus = "Fail"
            })
    }
})

export default productSlice.reducer