import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        changed: false,
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            state.changed = true;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    totalPrice: newItem.price,
                    name: newItem.name,
                    image: newItem.image,
                    size: newItem.size,
                    soldCount: newItem.soldCount,
                    rating: newItem.rating,
                    offerPrice: newItem.offerPrice
                });
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            state.changed = true;
            if (existingItem) {
                state.items = state.items.filter((item) => item.id !== id);
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        },
    },
})

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;