import React, { useState, useEffect, useCallback } from 'react';
import { Todo } from '../types';
import * as api from '../services/api';
import TodoList from '../components/TodoList';
import GeminiTaskSuggester from '../components/GeminiTaskSuggester';

const DashboardPage: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTodos = useCallback(async () => {
        try {
            setLoading(true);
            const userTodos = await api.getMyTodos();
            setTodos(userTodos);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch tasks.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);
    
    const addTodo = async (title: string) => {
        try {
            const newTodo = await api.createTodo(title);
            setTodos(prev => [...prev, newTodo]);
        } catch (err) {
            console.error("Failed to add todo", err);
        }
    };
    
    const addMultipleTodos = async (titles: string[]) => {
        try {
            const promises = titles.map(title => api.createTodo(title));
            const newTodos = await Promise.all(promises);
            setTodos(prev => [...prev, ...newTodos]);
        } catch (err) {
            console.error("Failed to add multiple todos", err);
        }
    };

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
        return <div className="text-center p-8">Loading tasks...</div>;
    }
    
    if (error) {
        return <div className="text-center p-8 text-red-500">Error: {error}</div>;
    }

    return (
        <div>
            <TodoList
                listTitle="My Tasks"
                todos={todos}
                addTodo={addTodo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
            />
            <GeminiTaskSuggester onAddSuggestedTasks={addMultipleTodos} />
        </div>
    );
};

export default DashboardPage;