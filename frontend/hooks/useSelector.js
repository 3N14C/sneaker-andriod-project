import {
  createSelector
} from '@reduxjs/toolkit';

const selectFavorites = (state) => state.favorites;

export const selectFavoriteProducts = createSelector(
  selectFavorites,
  (favorites) => favorites
);

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  selectCart,
  (cart) => cart
)

const selectAddress = (state) => state.address

export const selectAddressItem = createSelector(
  selectAddress,
  (address) => address
)

const selectCard = (state) => state.card

export const selectCardItem = createSelector(
  selectCard,
  (card) => card
)