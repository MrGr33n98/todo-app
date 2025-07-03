import React, { useMemo } from 'react';
import { Todo } from '../types';
import StatCard from './StatCard';
import TaskProgressBar from './TaskProgressBar';
import { ListBulletIcon, CheckCircleIcon, ClockIcon } from './icons/Icons';

interface AnalyticsDashboardProps {
    todos: Todo[];
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ todos }) => {
    const { totalTodos, completedTodos, pendingTodos, tasksPerUser } = useMemo(() => {
        const total = todos.length;
        const completed = todos.filter(t => t.completed).length;
        
        // Explicitly type the accumulator to ensure TypeScript knows it's a Record<number, number>
        const perUser = todos.reduce((acc: Record<number, number>, todo) => {
            acc[todo.owner_id] = (acc[todo.owner_id] || 0) + 1;
            return acc;
        }, {});

        return {
            totalTodos: total,
            completedTodos: completed,
            pendingTodos: total - completed,
            tasksPerUser: perUser,
        };
    }, [todos]);

    const maxTasks = useMemo(() => {
        const counts = Object.values(tasksPerUser);
        return counts.length > 0 ? Math.max(...counts) : 0;
    }, [tasksPerUser]);


    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Tasks" value={totalTodos} icon={<ListBulletIcon className="h-6 w-6" />} />
                <StatCard title="Completed Tasks" value={completedTodos} icon={<CheckCircleIcon className="h-6 w-6" />} />
                <StatCard title="Pending Tasks" value={pendingTodos} icon={<ClockIcon className="h-6 w-6" />} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Tasks per User ID</h3>
                <div className="space-y-4">
                    {Object.keys(tasksPerUser).length > 0 ? (
                        Object.entries(tasksPerUser)
                            .sort(([, countA], [, countB]) => countB - countA)
                            .map(([userId, count]) => (
                                <TaskProgressBar key={userId} label={`User ID: ${userId}`} count={count} total={maxTasks} />
                            ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">No user data to display.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;