import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        itemsList: [],
        totalItems: 0,
        showCart: false
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.itemsList.find(item => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += existingItem.price;
            } else {
                state.itemsList.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name
                });
                state.totalItems++;
            }
        },

        removeFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.itemsList.find(item => id === item.id);

            if (existingItem.quantity === 1) {
                state.itemsList = state.itemsList.filter(item => id !== item.id);
                state.totalItems--;
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
        },

        setShowCart(state) {
            state.showCart = !state.showCart;
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;