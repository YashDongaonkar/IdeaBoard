import React from 'react';
import { Route, Routes } from "react-router";
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';
import LoginRegisterPage from './pages/LoginRegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginRegisterPage />} />

      <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/create" element={<ProtectedRoute><CreatePage /></ProtectedRoute>} />
      <Route path="/note/:id" element={<ProtectedRoute><NoteDetailPage /></ProtectedRoute>} />
    </Routes>
  );
};

export default App;