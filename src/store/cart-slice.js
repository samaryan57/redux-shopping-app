import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

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

export const sendCartData = (cart) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            //Send state as sending request
            dispatch(uiActions.showNotification({
                message: "Sending Request",
                type: "warning",
                open: true
            }));
            
            const res = await fetch("https://redux-http-17d55-default-rtdb.firebaseio.com/cartItems.json",
                {
                    method: "PUT",
                    body: JSON.stringify(cart)
                }
            );
            const data = await res.json();
      
      
            //Send state as request is successful
            dispatch(uiActions.showNotification({
                open: true,
                message: "Successfully sent request to the Database",
                type: "success"
            }));
        };

        try {
            await sendRequest();
        } catch (err) {
            dispatch(uiActions.showNotification({
                open: true,
                message: "Sending request failed",
                type: "error"
            }));
        }
    }
}

export const cartActions = cartSlice.actions;
export default cartSlice;