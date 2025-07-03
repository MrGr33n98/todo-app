import React from 'react';

interface TaskProgressBarProps {
    label: string;
    count: number;
    total: number;
}

const TaskProgressBar: React.FC<TaskProgressBarProps> = ({ label, count, total }) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    
    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className="text-sm font-medium text-gray-500">{count} {count > 1 ? 'tasks' : 'task'}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
                    style={{ width: `${percentage}%` }}>
                </div>
            </div>
        </div>
    );
};

export default TaskProgressBar;
