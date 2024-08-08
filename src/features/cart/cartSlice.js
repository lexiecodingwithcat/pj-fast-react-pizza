import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   cart: [],
  cart: [
    {
      pizzaId: 12,
      name: "Mediterranean",
      qunatity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducer: {
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
