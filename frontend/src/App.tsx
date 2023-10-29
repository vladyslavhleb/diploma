import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Chat from './pages/chat';
import Chats from './pages/chats';
import Login from './pages/login';
import Register from './pages/register';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chat/*" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
