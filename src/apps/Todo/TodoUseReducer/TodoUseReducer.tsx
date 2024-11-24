import { useReducer } from "react";
import Todo from "../components/Todo/Todo";

type ActionType =
  | { type: "ADD"; payload: { value: string; id: string } }
  | { type: "DEL"; payload: string }; //

const reducer = (state: { value: string; id: string }[], action: ActionType) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DEL":
      return state.filter((ele: { value: string; id: string }) => ele.id !== action.payload);
  }
};

function TodoReducer() {
  const [state, dispatch] = useReducer(reducer, []);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (const data of new FormData(e.currentTarget)) {
      if (data[1].toString()) {
        dispatch({
          type: "ADD",
          payload: { id: Math.random().toString(16).slice(2), value: data[1].toString() },
        });
      }
    }
    e.currentTarget.reset();
  };
  const onDelete = (id: string) => {
    dispatch({ type: "DEL", payload: id });
  };
  return <Todo onDelete={onDelete} onSubmit={onSubmit} todos={state} />;
}

export default TodoReducer;
