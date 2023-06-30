import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchData = () => {
    return async (dispatch) => {
        const fetchRequest = async () => {
            const res = await fetch("https://http-redux-a45bb-default-rtdb.firebaseio.com/cartItems.json");
            const data = await res.json();
            return data;
        };

        try {
            const cartData = await fetchRequest();
            dispatch(cartActions.replaceData(cartData));
        } catch (err) {
            console.log(err);
            dispatch(uiActions.showNotification({
                open: true,
                message: "Fetching request failed",
                type: "error"
            }));
        }
    }
};

export const sendCartData = (cart) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            //Send state as sending request
            dispatch(uiActions.showNotification({
                message: "Sending Request",
                type: "warning",
                open: true
            }));
            
            const res = await fetch("https://http-redux-a45bb-default-rtdb.firebaseio.com/cartItems.json",
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
};