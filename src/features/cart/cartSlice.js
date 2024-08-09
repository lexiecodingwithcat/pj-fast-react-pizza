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
      item.quantity++;
      //update the total price as well
      item.totalPrice =
        item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );
      item.quantity--;
      item.totalPrice =
        item.quantity * item.unitPrice;
      if (item.quantity === 0)
        cartSlice.caseReducers.deleteItem(
          state,
          action,
        );

      // function can be called inside the same reducer
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
// we need another function to get the quantity of each pizza
export const getCurrentQuantityById =
  //  we pass id and then return the useSelector function -- a new arrow function
  //if we write (id, state) redux is unable to receive data
  (id) => (state) =>
    state.cart.cart.find(
      (item) => item.pizzaId === id,
      //if there is quantity return quantity
      // if id is undefined or null, return undefined
      //if the ?? left is null or undefined then return 0
    )?.quantity ?? 0;
