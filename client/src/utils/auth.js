// src/utils/auth.js

// Check if user is logged in
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };
  
  // Get user information
  export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  // Get user role
  export const getUserRole = () => {
    const user = getUser();
    return user ? user.role : null;
  };
  
  // Log out user
  export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };
  
  // Set auth token for axios
  export const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem('token', token);
      return true;
    }
    return false;
  };