import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./features/store";
import { addTodo, deleteTodo } from "./features/todoSlice";
import Todo from "../components/Todo/Todo";

function TodoRedux() {
  const todos = useSelector((state: RootState) => state.todo);
  const dispatch = useAppDispatch();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (const data of new FormData(e.currentTarget)) {
      if (data[1].toString()) {
        dispatch(addTodo({ id: Math.random().toString(16).slice(2), value: data[1].toString() }));
      }
    }
    e.currentTarget.reset();
  };
  const onDelete = (id: string) => {
    dispatch(deleteTodo({ id }));
  };
  return <Todo onDelete={onDelete} onSubmit={onSubmit} todos={todos} />;
}

export default TodoRedux;
