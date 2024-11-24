import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ITodo {
  value: string;
  id: string;
}
const initialState: ITodo[] = [];

const callDummyApi = createAsyncThunk("callAsync", async (a: string) => {
  const res = await (await fetch("https://dummyjson.com/products")).json();
  console.log(a, res);
});

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (todos, action) => {
      todos.push(action.payload);
    },
    deleteTodo: (todos, action) => {
      return todos.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(callDummyApi.fulfilled, () => {});
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
