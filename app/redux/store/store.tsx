import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import categoryReducer from "@/app/redux/slices/categoriesSlice"
import productReducer from "@/app/redux/slices/productsSlice";
import shopReducer from "@/app/redux/slices/shopSlice";
import statusReducer from "@/app/redux/slices/statusSlice";
import favoritesReducer from "@/app/redux/slices/favoritesSlice";

const store = configureStore({
    reducer: {
        categories: categoryReducer,
        products: productReducer,
        shop: shopReducer,
        status: statusReducer,
        favorites: favoritesReducer,
    }
})

export default store
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
export const useAppDispatch: () => typeof store.dispatch = useDispatch;