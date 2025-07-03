import React, { useState } from 'react';
import { Todo } from '../types.ts';
import { TrashIcon } from './icons/Icons';

interface TodoListProps {
    todos: Todo[];
    addTodo?: (title: string) => Promise<void>;
    toggleTodo: (id: number, completed: boolean) => Promise<void>;
    deleteTodo: (id: number) => Promise<boolean>;
    showAll?: boolean;
    listTitle?: string;
}

const TodoList: React.FC<TodoListProps> = ({ todos, addTodo, toggleTodo, deleteTodo, showAll = false, listTitle }) => {
    const [newTodo, setNewTodo] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!addTodo || !newTodo.trim() || isSubmitting) return;
        
        setIsSubmitting(true);
        await addTodo(newTodo);
        setNewTodo('');
        setIsSubmitting(false);
    };

    const handleDelete = async (id: number) => {
        const success = await deleteTodo(id);
        if (!success) {
            setError("You can only delete your own tasks.");
            setTimeout(() => setError(''), 3000);
        } else {
            setError('');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            {listTitle && <h2 className="text-2xl font-bold text-gray-800 mb-6">{listTitle}</h2>}
            {addTodo && (
                <form onSubmit={handleAddTodo} className="flex flex-col sm:flex-row gap-4 mb-4">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add a new task"
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        disabled={isSubmitting}
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Adding...' : 'Add Task'}
                    </button>
                </form>
            )}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <ul>
                {todos.length > 0 ? (
                    todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="flex items-center justify-between p-3 mb-2 border rounded-md transition-colors duration-200 hover:bg-slate-50"
                        >
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id, !todo.completed)}
                                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                                <span
                                    onClick={() => toggleTodo(todo.id, !todo.completed)}
                                    className={`ml-3 text-gray-800 cursor-pointer ${todo.completed ? 'line-through text-gray-400' : ''}`}
                                >
                                    {todo.title}
                                </span>
                                {showAll && <span className="text-xs text-gray-500 ml-2 bg-slate-200 px-2 py-0.5 rounded-full">(Owner ID: {todo.owner_id})</span>}
                            </div>
                            <button
                                onClick={() => handleDelete(todo.id)}
                                className="p-2 text-sm font-medium text-red-600 rounded-full hover:bg-red-100 transition-colors"
                                aria-label={`Delete task ${todo.title}`}
                            >
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-4">No tasks here. Great job, or time to add some!</p>
                )}
            </ul>
        </div>
    );
};

export default TodoList;