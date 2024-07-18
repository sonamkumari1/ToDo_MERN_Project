import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const res = await axios.get('http://localhost:5000/api/todos', config);
      setTodos(res.data);
      localStorage.setItem('todos', JSON.stringify(res.data));
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const addTodo = async (title, description) => {
    try {
      const token = localStorage.getItem('token') || '';
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };

      const body = JSON.stringify({ title, description, status: 'pending' });
      const res = await axios.post('http://localhost:5000/api/todos/add', body, config);
      const newTodos = [...todos, res.data];
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('token') || '';
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      await axios.delete(`http://localhost:5000/api/todos/${id}`, config);
      const newTodos = todos.filter(todo => todo._id !== id);
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      const token = localStorage.getItem('token') || '';
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };

      const res = await axios.put(`http://localhost:5000/api/todos/${updatedTodo._id}`, updatedTodo, config);
      const newTodos = todos.map(todo => (todo._id === updatedTodo._id ? res.data : todo));
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  useEffect(() => {
    if (todos.length === 0) {
      fetchTodos();
    }
  }, []);

  const contextValue = {
    todos,
    fetchTodos,
    addTodo,
    deleteTodo,
    updateTodo,
  };

  return <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>;
};
