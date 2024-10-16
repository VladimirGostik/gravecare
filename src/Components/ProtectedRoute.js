import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();  // Prístup k aktuálnemu stavu používateľa

  // Ak používateľ nie je prihlásený, presmeruj ho na prihlasovaciu stránku
  if (!user) {
    return <Navigate to="/" />;
  }

  // Ak je prihlásený, ale nemá požadovanú rolu, presmeruj ho na domovskú stránku alebo iný vhodný cieľ
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/home" />;  // Napríklad presmerovať bežných používateľov na UserDashboard
  }

  // Ak používateľ má správnu rolu, zobraz chránenú stránku
  return children;
};

export default ProtectedRoute;
