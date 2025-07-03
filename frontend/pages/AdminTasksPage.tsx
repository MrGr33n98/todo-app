import React, { useState, useEffect, useCallback } from 'react';
import { Todo } from '../types';
import * as api from '../services/api';
import TodoList from '../components/TodoList';
import { useAuth } from '../context/AuthContext';

const AdminTasksPage: React.FC = () => {
    const { user } = useAuth();
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

    const toggleTodo = async (id: number, completed: boolean) => {
        try {
            const updatedTodo = await api.updateTodo(id, { completed });
            setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
        } catch (err) {
            console.error("Failed to toggle todo", err);
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            await api.deleteTodoById(id);
            setTodos(todos.filter(todo => todo.id !== id));
            return true;
        } catch (err) {
            console.error("Failed to delete todo", err);
            return false;
        }
    };
    
    if (loading) {
        return <div className="text-center p-8">Loading all tasks...</div>;
    }
    
    if (error) {
        return <div className="text-center p-8 text-red-500">Error: {error}</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Task Panel</h1>
            <p className="text-gray-600 mb-6">Viewing all user tasks as <span className="font-semibold">{user?.username}</span>.</p>
            <TodoList
                todos={todos}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                showAll={true}
            />
        </div>
    );
};

export default AdminTasksPage;
