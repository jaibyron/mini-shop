import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";
import todoReducer from "./todoSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    todo: todoReducer,
  },
});
