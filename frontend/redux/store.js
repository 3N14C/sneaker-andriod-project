import {
    combineReducers,
    configureStore
} from "@reduxjs/toolkit";
import {
    goodsApi
} from "./goodsApi";
import {
    specialOffer
} from "./specialOffer";
import {
    brand
} from "./brand";
import {
    favoritesSlice
} from "./favourite/favourite.slice";
import {
    sizeSneaker
} from "./size";
import {
    cartSlice
} from "./cart/cart.slice";
import {
    sneaker
} from "./sneaker";
import {
    addressSlice
} from "./address/address.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { cardSlice } from "./card/card.slice";
import { order } from "./order";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["favorites", "cart", "order", "address", "card"],
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
    [goodsApi.reducerPath]: goodsApi.reducer,
    [specialOffer.reducerPath]: specialOffer.reducer,
    [brand.reducerPath]: brand.reducer,
    [sneaker.reducerPath]: sneaker.reducer,
    [sizeSneaker.reducerPath]: sizeSneaker.reducer,
    [order.reducerPath]: order.reducer,
    favorites: favoritesSlice.reducer,
    cart: cartSlice.reducer,
    address: addressSlice.reducer,
    card: cardSlice.reducer
}))

export const store = configureStore({
    reducer: persistedReducer,


    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware().concat(
            goodsApi.middleware,
            specialOffer.middleware,
            brand.middleware,
            sneaker.middleware,
            sizeSneaker.middleware,
            order.middleware
        )
    )
})

export const persistor = persistStore(store)