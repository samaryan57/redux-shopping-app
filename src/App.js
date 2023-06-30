import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import { sendCartData, fetchData } from "./store/cart-actions";

function App() {

  const [isFirstRender, setFirstRender] = useState(true);
  // let isFirstRender = true;

  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);
  const cart = useSelector(state => state.cart);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (isFirstRender) {
      setFirstRender(false);
      return;
    }
    dispatch(fetchData());
  }, [cart, dispatch, isFirstRender]);

  useEffect(() => {
    if (isFirstRender) {
      setFirstRender(false);
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch, notification, isFirstRender]);

  return (
    <div className="App">
      {notification && <Notification type={notification.type} message={notification.message} />}
      {isLoggedIn ? <Layout /> : <Auth />}
    </div>
  );
}

export default App;
