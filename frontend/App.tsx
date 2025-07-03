import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminTasksPage from './pages/AdminTasksPage';
import AnalyticsPage from './pages/AnalyticsPage';
import Header from './components/Header';

// ProtectedRoute wrapper to handle authorization
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ children, allowedRoles }) => {
    const { isAuthenticated, user, loading } = useAuth();
    
    if (loading) {
        return <div className="flex items-center justify-center h-screen text-lg font-semibold">Authenticating...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

// Main content component
const AppContent: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-100">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                    <Route path="/admin/tasks" element={<ProtectedRoute allowedRoles={['admin']}><AdminTasksPage /></ProtectedRoute>} />
                    <Route path="/analytics" element={<ProtectedRoute allowedRoles={['admin']}><AnalyticsPage /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </div>
    );
};

// Top-level App component
export default function App() {
    return (
        <AuthProvider>
            <HashRouter>
                <AppContent />
            </HashRouter>
        </AuthProvider>
    );
}
