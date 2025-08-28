import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const path = location.pathname;

  // Avoid crashes if user is null/undefined
  const role = user?.role;

  if (location.pathname === '/') {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    }
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/shop/home" replace />;
    }
  }

  // Redirect to login if not authenticated and trying to access protected routes
  if (
    !isAuthenticated &&
    !path.includes('/login') &&
    !path.includes('/register')
  ) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirect authenticated users away from login/register pages
  if (
    isAuthenticated &&
    (path.includes('/login') || path.includes('/register'))
  ) {
    return role === 'admin' ? (
      <Navigate to="/admin/dashboard" replace />
    ) : (
      <Navigate to="/shop/home" replace />
    );
  }

  // Prevent non-admin users from accessing any admin routes
  if (isAuthenticated && role !== 'admin' && path.startsWith('/admin')) {
    return <Navigate to="/unauth-page" replace />;
  }

  // Redirect admin users away from shop pages to admin dashboard
  if (isAuthenticated && role === 'admin' && path.startsWith('/shop')) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If none of the above, render children (authorized access)
  return <>{children}</>;
};

export default CheckAuth;
