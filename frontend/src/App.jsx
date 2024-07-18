
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './cmponents/layout/Navbar';
import Register from './cmponents/auth/Register';
import Login from './cmponents/auth/Login';
import TodoForm from './cmponents/todos/TodoForm';
import TodoList from './cmponents/todos/TodoList';
import { TodoProvider } from './context/TodoContext'; 
import './index.css';

const App = () => {
 
  const token = localStorage.getItem('token') || '';
  return (
    <AuthProvider>
      <TodoProvider> 
        <Router>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/todos" element={<TodoList />} />
            <Route path="/todos/add" element={<TodoForm token={token} />} />
          </Routes>
        </Router>
      </TodoProvider>
    </AuthProvider>
  );
};

export default App;
