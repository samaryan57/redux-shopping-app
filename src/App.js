import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";

function App() {

  const [isFirstRender, setFirstRender] = useState(true);

  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);
  const cart = useSelector(state => state.cart);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (isFirstRender) {
      setFirstRender(false);
      return;
    }
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
    sendRequest().catch(err => {
      //Send state as error
      dispatch(uiActions.showNotification({
        open: true,
        message: "Sending request failed",
        type: "error"
      }));
    });
  }, [cart]);


  return (
    <div className="App">
      {notification && <Notification type={notification.type} message={notification.message} />}
      {isLoggedIn ? <Layout /> : <Auth />}
    </div>
  );
}

export default App;
