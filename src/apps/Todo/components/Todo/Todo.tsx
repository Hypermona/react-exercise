import React from "react";
import style from "./todo.module.scss";

interface ITodo {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onDelete: (id: string) => void;
  todos: { id: string; value: string }[];
}

function Todo({ onDelete, onSubmit, todos }: ITodo) {
  return (
    <div>
      <h1>Todo</h1>
      <form onSubmit={onSubmit}>
        <input name="todo" className={style.input} />
        <input type="submit" className={style.btn + " " + style.primary} />
      </form>

      <ul className={style.card}>
        {todos.map((todo) => (
          <li key={todo.id} className={style.item} onClick={() => onDelete(todo.id)}>
            {todo.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
