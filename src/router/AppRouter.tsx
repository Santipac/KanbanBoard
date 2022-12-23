import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { App } from '../App';
import { AuthRouter } from '../components/auth/router';
import { useAuthStore } from '../hooks';
import { UserStatus } from '../types/enums';

export const AppRouter = () => {
  const { status } = useAuthStore();
  return (
    <Routes>
      {status === UserStatus.AUTHENTICATED ? (
        <>
          <Route path="/" element={<App />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      ) : (
        <Route path="auth/*" element={<AuthRouter />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
