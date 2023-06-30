import React from "react";
import Header from "./Header";
import Products from "./Products";
import "./Layout.css";
import CartItems from "./CartItems";
import { useSelector } from "react-redux";

const Layout = () => {
  let total = 0;

  const cartItems = useSelector(state => state.cart.itemsList);

  cartItems.forEach(item => {
    total += item.totalPrice;
  });

  const showCart = useSelector(state => state.cart.showCart);

  return (
    <React.Fragment>
      <div className="layout">
        <Header />
        <Products />
        {showCart && <CartItems />}
        <div className="total-price">
          <h3>Total: ${total}</h3>
          <button className="orderBtn">Place Order</button>
        </div>{" "}
      </div>
    </React.Fragment>
  );
};

export default Layout;


// Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
//     at App (http://localhost:3000/static/js/bundle.js:39:90)
//     at Provider (http://localhost:3000/static/js/bundle.js:47313:5)