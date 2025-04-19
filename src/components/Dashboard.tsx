
import { useState } from 'react';
import { Task } from '../types/Task';
import TaskCard from './TaskCard';
import { cn } from '@/lib/utils';
import { AlertCircle, Clock, Settings, PieChart } from 'lucide-react';

interface DashboardProps {
  tasks: Task[];
  onTaskClick: (taskId: number) => void;
  className?: string;
}

const Dashboard = ({ tasks, onTaskClick, className }: DashboardProps) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'classes' | 'assignments'>('all');
  
  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'classes') return task.category === 'class' || task.category === 'meeting';
    if (activeFilter === 'assignments') return task.category === 'assignment';
    return true;
  });
  
  return (
    <div className={cn("bg-white rounded-lg shadow-lg h-full p-6", className)}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Task Dashboard</h2>
        <button className="text-nyu-purple hover:text-nyu-light">
          <Settings className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex gap-2 mb-6">
        <button 
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium",
            activeFilter === 'all' 
              ? "bg-nyu-purple text-white" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
          onClick={() => setActiveFilter('all')}
        >
          All Tasks
        </button>
        <button 
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium",
            activeFilter === 'classes' 
              ? "bg-nyu-purple text-white" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
          onClick={() => setActiveFilter('classes')}
        >
          Classes
        </button>
        <button 
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium",
            activeFilter === 'assignments' 
              ? "bg-nyu-purple text-white" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
          onClick={() => setActiveFilter('assignments')}
        >
          Assignments
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard 
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task.id)}
            />
          ))
        ) : (
          <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500 flex flex-col items-center">
            <AlertCircle className="h-8 w-8 mb-2" />
            <p>No tasks match your current filters</p>
          </div>
        )}
      </div>
      
      <div className="mt-auto">
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
            <Clock className="h-4 w-4 mr-1" /> Recent Activity
          </h3>
          <ul className="text-sm text-gray-500 space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Joined Zoom meeting [Wed, 4:55 PM]
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Submitted assignment [Mon, 11:23 PM]
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Checked course materials [Mon, 3:15 PM]
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-between text-xs text-gray-500 border-t pt-4">
        <div>
          <PieChart className="h-4 w-4 inline mr-1" />
          <span>Your AI pattern accuracy: 92%</span>
        </div>
        <button className="text-nyu-purple hover:underline">
          View Stats
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
