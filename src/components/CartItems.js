import React from "react";
import CartItem from "./CartItem";
import "./Cart.css";
import { useSelector } from "react-redux";
const CartItems = () => {

  const cartItems = useSelector(state => state.cart.itemsList);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => {
          return (
            <li key={item.id} >
              <CartItem 
                id={item.id} 
                name={item.name} 
                quantity={item.quantity} 
                price={item.price} 
                total={item.totalPrice} 
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CartItems;
