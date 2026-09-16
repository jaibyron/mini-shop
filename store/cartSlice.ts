import { createSlice } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //  A Redux reducer always follows the (state, action) => newState pattern,
    //  regardless of whether you are building a shopping cart, authentication system,
    //  a todo list, a game, or anything else.

    //  The idea is:
    //
    // function reducer(state, action) {
    //   //decide how state changes based on the action
    // }

    // A reducer receives:
    // 1. state — the current data stored in Redux.
    // 2. action — an object describing what happened.

    // The names "state" and "action" are Redux concepts;
    // the actual shape of them depends on your application.

    addItem(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
        });
      }
    },
    //  Delete a single item in the array where itemId matches
    removeItem(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem === undefined) {
        return;
      }

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== itemId);
      }
    },
    //  Remove all objects where itemId matches
    deleteItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    //  Remove all objects from the store
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, deleteItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
