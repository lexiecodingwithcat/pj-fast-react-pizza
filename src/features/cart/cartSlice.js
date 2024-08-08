import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //payload= newItem
      //push is a method used by JS array to push the new item to the end of the array
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //payload= id
      //assign new array to the state.cart
      state.cart = state.cart.filter(
        (item) => item.pizzaId !== action.payload,
      );
    },
    increaseItemQuantity(state, action) {
      //payload = pizzaId
      const item = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );
      item.qunatity++;
      //update the total price as well
      item.totalPrice =
        item.qunatity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );
      item.qunatity--;
      item.totalPrice =
        item.qunatity * item.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce(
    (sum, item) => sum + item.totalPrice,
    0,
  );
export const getCart = (state) => state.cart.cart;
