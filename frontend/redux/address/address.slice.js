import {
    createSlice
} from "@reduxjs/toolkit";

export const addressSlice = createSlice({
    name: "address",
    initialState: {
        address: [],
    },
    reducers: {
        addAddress: (state, action) => {
            const newAddress = action.payload

            state.address.push({
                name: newAddress.name,
                city: newAddress.city,
                street: newAddress.street,
                zipCode: newAddress.zipCode
            })
        },

        switchAddress: (state, action) => {
            const index = state.address.findIndex(item => item.id === action.payload)
            if (index !== -1) {
                state.address.splice(index, 1)
            }

            state.address.push({
                name: action.payload.name,
                city: action.payload.city,
                street: action.payload.street,
                zipCode: action.payload.zipCode
            })
        }
    },
})

export const {
    addAddress
} = addressSlice.actions