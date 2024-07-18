import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useTodoContext } from '../../context/TodoContext'; // Adjust path as per your project structure

const TodoList = () => {
  const { todos, fetchTodos, deleteTodo, updateTodo } = useTodoContext();

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Todo List</h2>
      {todos.map(todo => (
        <TodoItem key={todo._id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
      ))}
    </div>
  );
};

export default TodoList;
