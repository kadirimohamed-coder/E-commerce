import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, image, size, color, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size && item.color === color
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id,
          name,
          price,
          image,
          size,
          color,
          quantity,
        });
      }

      state.totalQuantity += quantity;
      state.totalPrice += price * quantity;
    },

    removeFromCart: (state, action) => {
      const { id, size, color } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.size === size && item.color === color
      );

      if (item) {
        state.totalPrice -= item.price * item.quantity;
        state.totalQuantity -= item.quantity;
        state.items = state.items.filter(
          (item) => !(item.id === id && item.size === size && item.color === color)
        );
      }
    },

    updateQuantity: (state, action) => {
      const { id, size, color, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.size === size && item.color === color
      );

      if (item) {
        const quantityDifference = quantity - item.quantity;
        state.totalPrice += item.price * quantityDifference;
        state.totalQuantity += quantityDifference;
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
