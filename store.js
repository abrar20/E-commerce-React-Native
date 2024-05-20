import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./redux/CartReducer";
import FavoriteReducer from "./redux/FavoriteReducer";

export default configureStore({
    reducer:{
        cart:CartReducer,
        favorite:FavoriteReducer
    }
})