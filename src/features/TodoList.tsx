// add imports
import { FormEvent, useState } from "react";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "./api/todos";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTodo({
      userId: 1,
      title: newTodo,
      completed: false,
    });
    setNewTodo("");
  };

  return (
    <main>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">Enter a new todo item</label>
        <div className="new-todo">
          <input
            type="text"
            id="new-todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter new todo"
          />
        </div>
        <button className="submit">Submit</button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : isSuccess ? (
        todos.map((todo) => (
          <article key={todo.id}>
            <div className="todo">
              <input
                type="checkbox"
                checked={todo.completed}
                id={todo.id.toString()}
                onChange={() =>
                  updateTodo({ ...todo, completed: !todo.completed })
                }
              />
              <label htmlFor={todo.id.toString()}>{todo.title}</label>
            </div>
            <button className="trash" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </article>
        ))
      ) : null}
    </main>
  );
};
export default TodoList;
