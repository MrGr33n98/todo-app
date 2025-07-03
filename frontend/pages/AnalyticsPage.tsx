import React, { useState, useEffect, useCallback } from 'react';
import { Todo } from '../types';
import * as api from '../services/api';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

const AnalyticsPage: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchAllTodos = useCallback(async () => {
        try {
            setLoading(true);
            const allTodos = await api.getAllTodos();
            setTodos(allTodos);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch tasks.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllTodos();
    }, [fetchAllTodos]);
    
    if (loading) {
        return <div className="text-center p-8">Loading analytics data...</div>;
    }
    
    if (error) {
        return <div className="text-center p-8 text-red-500">Error: {error}</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Analytics Dashboard</h1>
            <AnalyticsDashboard todos={todos} />
        </div>
    );
};

export default AnalyticsPage;
