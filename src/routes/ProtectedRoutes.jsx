
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import FullPageSpinner from '@/components/shared/FullPageSpinner';

export const AdminRoute = () => {
    const { isLoading, isAuthenticated, isAdmin } = useContext(AuthContext);

    if (isLoading) {
        return <FullPageSpinner />;
    }

    if (!isAuthenticated || !isAdmin) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};