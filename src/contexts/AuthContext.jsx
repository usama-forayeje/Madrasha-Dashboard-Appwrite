
import FullPageSpinner from '@/components/shared/FullPageSpinner';
import { useCurrentUser } from '@/hooks/useAuth';
import React, { createContext, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: user, isLoading, isError } = useCurrentUser();


  if (isLoading) {
    return <FullPageSpinner />;
  }

  const value = {
    user: isError ? null : user,
    isAuthenticated: !isError && !!user,
    isAdmin: !isError && user?.prefs?.role === 'admin',
    isLoading: false,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};