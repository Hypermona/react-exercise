import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import todoSlice from "./todoSlice";

const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();

export default store;
