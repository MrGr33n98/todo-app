import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

const Header: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated) {
        return null; // Don't show header on login page
    }
    
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    const activeLinkClass = "border-indigo-500 text-gray-900";
    const inactiveLinkClass = "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";

    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <h1 className="text-xl font-bold text-indigo-600">TodoApp</h1>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <NavLink to="/" end className={({ isActive }) => `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive ? activeLinkClass : inactiveLinkClass}`}>
                                My Dashboard
                            </NavLink>
                            {user?.role === 'admin' && (
                                <>
                                    <NavLink to="/admin/tasks" className={({ isActive }) => `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive ? activeLinkClass : inactiveLinkClass}`}>
                                        All Tasks
                                    </NavLink>
                                    <NavLink to="/analytics" className={({ isActive }) => `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive ? activeLinkClass : inactiveLinkClass}`}>
                                        Analytics
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-4">
                            Welcome, <span className="font-medium text-gray-800">{user?.username} ({user?.role})</span>
                        </span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;