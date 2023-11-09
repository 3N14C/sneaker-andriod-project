import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
    name: "card",
    initialState: {
        card: [],
    },
    reducers: {
        addCard: (state, action) => {
            const newCard = action.payload
            const defaultBalance = 50_000

            state.card.push({
                nameCard: newCard.nameCard,
                numberCard: newCard.numberCard,
                dateCard: newCard.dateCard,
                cvvCard: newCard.cvvCard,
                balanceCard: newCard.balanceCard ? newCard.balanceCard + defaultBalance : defaultBalance
            })
        },

        addBalanceToCard: (state, action) => {
            const cardIndex = action.payload
            const newBalance = action.payload

            state.card[cardIndex].balanceCard += newBalance
        }
    },
})

export const { addCard, addBalanceToCard } = cardSlice.actions