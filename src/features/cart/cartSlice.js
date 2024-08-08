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

const createSlice = createSlice({
  name: "cart",
  initialState,
  reducer: {
    addItem(state, action) {
      //payload= newItem
      //push is a method used by JS array to push the new item to the end of the array
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {},
    increaseItemQuantity(state, action) {},
    decreaseItemQuantity(state, action) {},
    clearCart(state, action) {},
  },
});
