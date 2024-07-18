import React, { useState } from 'react';
import { useTodoContext } from '../../context/TodoContext'; // Adjust path as per your project structure

const TodoForm = ({ token }) => {
  const { addTodo } = useTodoContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    addTodo(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={onSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Add Todo</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full mb-4 p-2 border"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="block w-full mb-4 p-2 border"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
