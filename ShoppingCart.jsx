import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/cartSlice";
import "./ShoppingCart.css";

const ShoppingCart = ({ onCheckout }) => {
  const dispatch = useDispatch();
  const { items, totalPrice, totalQuantity } = useSelector(
    (state) => state.cart
  );

  const handleRemoveItem = (id, size, color) => {
    dispatch(removeFromCart({ id, size, color }));
  };

  const handleUpdateQuantity = (id, size, color, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id, size, color);
    } else {
      dispatch(updateQuantity({ id, size, color, quantity }));
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      dispatch(clearCart());
    }
  };

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Start shopping to add items to your cart!</p>
      </div>
    );
  }

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart ({totalQuantity} items)</h2>

      <div className="cart-items">
        {items.map((item) => (
          <div key={`${item.id}-${item.size}-${item.color}`} className="cart-item">
            <img src={item.image} alt={item.name} className="item-image" />

            <div className="item-details">
              <h4>{item.name}</h4>
              <p>
                <strong>Size:</strong> {item.size}
              </p>
              <p>
                <strong>Color:</strong>{" "}
                {item.color.charAt(0).toUpperCase() + item.color.slice(1)}
              </p>
              <p className="item-price">${item.price.toFixed(2)}</p>
            </div>

            <div className="item-quantity">
              <button
                onClick={() =>
                  handleUpdateQuantity(
                    item.id,
                    item.size,
                    item.color,
                    item.quantity - 1
                  )
                }
              >
                −
              </button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleUpdateQuantity(
                    item.id,
                    item.size,
                    item.color,
                    parseInt(e.target.value) || 1
                  )
                }
                min="1"
              />
              <button
                onClick={() =>
                  handleUpdateQuantity(
                    item.id,
                    item.size,
                    item.color,
                    item.quantity + 1
                  )
                }
              >
                +
              </button>
            </div>

            <div className="item-total">
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>

            <button
              className="btn-remove"
              onClick={() =>
                handleRemoveItem(item.id, item.size, item.color)
              }
              title="Remove item"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span className="shipping-free">FREE</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="cart-actions">
        <button className="btn-clear" onClick={handleClearCart}>
          Clear Cart
        </button>
        <button className="btn-checkout" onClick={onCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
