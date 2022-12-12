import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { App } from '../App';
import { LoginPage, RegisterPage } from '../components/auth';
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/*" element={<Navigate to="/" />} />
      <Route path="/auth" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/*" element={<Navigate to="/auth" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
