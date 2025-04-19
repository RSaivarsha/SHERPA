
import { Task } from '../types/Task';
import { cn } from '@/lib/utils';
import { Clock, Calendar, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  compact?: boolean;
}

const TaskCard = ({ task, onClick, compact = false }: TaskCardProps) => {
  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'running':
        return <Loader2 className="h-5 w-5 text-nyu-purple animate-spin" />;
      default:
        return <ArrowRight className="h-5 w-5 text-nyu-purple group-hover:translate-x-1 transition-transform" />;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'class':
        return 'bg-blue-100 text-blue-800';
      case 'assignment':
        return 'bg-amber-100 text-amber-800';
      case 'meeting':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getConfidenceBadge = (confidence: number) => {
    let bgColor = 'bg-gray-100';
    
    if (confidence >= 90) bgColor = 'bg-green-100';
    else if (confidence >= 70) bgColor = 'bg-blue-100';
    else if (confidence >= 50) bgColor = 'bg-yellow-100';
    
    return (
      <div className={`${bgColor} text-xs px-2 py-1 rounded-full font-medium`}>
        {confidence}% Match
      </div>
    );
  };
  
  if (compact) {
    return (
      <button
        onClick={onClick}
        disabled={task.status === 'completed' || task.status === 'running'}
        className={cn(
          "w-full text-left p-3 rounded-md bg-white border transition-all group",
          "hover:border-nyu-purple hover:shadow-md",
          task.status === 'completed' && "opacity-50",
          task.status === 'running' && "border-nyu-purple bg-purple-50"
        )}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-sm truncate mr-2">{task.title}</h3>
          {getStatusIcon()}
        </div>
      </button>
    );
  }
  
  return (
    <div 
      className={cn(
        "border rounded-lg overflow-hidden bg-white transition-all",
        "hover:border-nyu-purple hover:shadow-md cursor-pointer",
        task.status === 'completed' && "opacity-50",
        task.status === 'running' && "border-nyu-purple bg-purple-50"
      )}
    >
      <div className="p-4">
        <div className="flex justify-between">
          <span className={cn("text-xs px-2 py-1 rounded-full font-medium", getCategoryColor(task.category))}>
            {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
          </span>
          {getConfidenceBadge(task.confidence)}
        </div>
        
        <h3 className="font-bold mt-2 text-gray-900">{task.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        
        {task.dueDate && (
          <div className="flex items-center mt-3 text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" /> 
            <span>Due: {task.dueDate.toLocaleDateString()}</span>
          </div>
        )}
        
        {task.pattern.timeRange && (
          <div className="flex items-center mt-1 text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" /> 
            <span>Usually done: {task.pattern.timeRange.start} - {task.pattern.timeRange.end}</span>
          </div>
        )}
      </div>
      
      <button
        onClick={onClick}
        disabled={task.status === 'completed' || task.status === 'running'}
        className={cn(
          "w-full py-3 px-4 flex items-center justify-center gap-2",
          "text-sm font-medium border-t group transition-colors",
          task.status === 'running' 
            ? "bg-purple-50 text-nyu-purple border-nyu-purple" 
            : task.status === 'completed'
              ? "bg-gray-50 text-green-700 border-gray-100"
              : "bg-gray-50 hover:bg-nyu-purple hover:text-white"
        )}
      >
        {task.status === 'running' && "Running..."}
        {task.status === 'completed' && "Completed"}
        {task.status === 'pending' && "Run Automation"}
        {getStatusIcon()}
      </button>
    </div>
  );
};

export default TaskCard;
