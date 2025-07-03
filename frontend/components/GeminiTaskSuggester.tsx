import React, { useState } from 'react';
import { suggestTasks } from '../services/geminiService.ts';
import { SparklesIcon } from './icons/Icons';

interface GeminiTaskSuggesterProps {
    onAddSuggestedTasks: (tasks: string[]) => void;
}

const GeminiTaskSuggester: React.FC<GeminiTaskSuggesterProps> = ({ onAddSuggestedTasks }) => {
    const [goal, setGoal] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSuggest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!goal.trim()) return;

        setLoading(true);
        setError('');
        setSuggestions([]);

        try {
            const tasks = await suggestTasks(goal);
            setSuggestions(tasks);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleAddTasks = () => {
        onAddSuggestedTasks(suggestions);
        setSuggestions([]);
        setGoal('');
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8 border border-indigo-200">
            <div className="flex items-center mb-4">
                <SparklesIcon className="h-6 w-6 text-indigo-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">AI Task Suggester</h3>
            </div>
            <p className="text-gray-600 mb-4">Feeling stuck? Describe a larger goal and let AI break it down into smaller tasks for you.</p>
            <form onSubmit={handleSuggest} className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="e.g., Plan a birthday party"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center justify-center"
                    disabled={loading || !goal.trim()}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Thinking...
                        </>
                    ) : 'Suggest Tasks'}
                </button>
            </form>
            
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            
            {suggestions.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-semibold text-gray-700">Suggestions:</h4>
                    <ul className="list-disc list-inside mt-2 space-y-2 text-gray-600">
                        {suggestions.map((task, index) => (
                            <li key={index}>{task}</li>
                        ))}
                    </ul>
                    <button
                        onClick={handleAddTasks}
                        className="mt-4 px-6 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Add these to my list
                    </button>
                </div>
            )}
        </div>
    );
};

export default GeminiTaskSuggester;