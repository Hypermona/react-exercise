import { useState } from "react";
import Todo from "./components/Todo/Todo";

function SimpleTodo() {
  const [todos, setTodos] = useState<{ id: string; value: string }[]>([]);
  console.log(todos);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (const data of new FormData(e.currentTarget)) {
      if (data[1].toString()) {
        setTodos((prev) => [
          ...prev,
          { id: Math.random().toString(16).slice(2), value: data[1].toString() },
        ]);
      }
    }
    e.currentTarget.reset();
  };
  const onDelete = (id: string) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };
  return <Todo onDelete={onDelete} onSubmit={onSubmit} todos={todos} />;
}

export default SimpleTodo;
