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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chats/:chat_id" element={<Chats />} />
        <Route path="/chat/*" element={<Chat />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
