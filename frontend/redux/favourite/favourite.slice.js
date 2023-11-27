import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  configureStore,
  createSlice
} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [] || JSON.parse(AsyncStorage.getItem('favoriteItems'))
  },
  reducers: {
    addToFavorites: (state, action) => {
      const isExist = state.items.some(item => item.id === action.payload.id)
      if (!isExist) {
        const newItem = action.payload
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          image: newItem.image,
          size: newItem.size,
          rating: newItem.rating,
          soldCount: newItem.soldCount,
          createdAt: newItem.createdAt
        })
      } else {
        const index = state.items.findIndex(item => item.id === action.payload.id)
        if (index !== -1) {
          state.items.splice(index, 1)
        }
      }
      
    },
  }
})


export const {
  addToFavorites
} = favoritesSlice.actions