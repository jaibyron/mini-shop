import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  items: TodoItem[];
}

const initialState: TodoState = {
  items: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action) {
      state.items.push({
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item);

      if (existingItem) {
        existingItem.completed = !existingItem.completed;
      }
    },
    clearTodo(state) {
      state.items = [];
    },
  },
});

export const { addTodo, toggleTodo, clearTodo } = todoSlice.actions;
export default todoSlice.reducer;
