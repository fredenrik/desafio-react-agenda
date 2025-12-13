import { Routes, Route, Navigate } from 'react-router-dom';
import { UsersPage } from '../pages/UsersPage/UsersPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/contacts" replace />} />
      <Route path="/contacts" element={<UsersPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
