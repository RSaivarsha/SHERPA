
import { useState } from 'react';
import { Task } from '../types/Task';
import TaskCard from './TaskCard';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface TaskSidebarProps {
  tasks: Task[];
  onTaskClick: (taskId: number) => void;
  isOpen: boolean;
}

const TaskSidebar = ({ tasks, onTaskClick, isOpen }: TaskSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  if (!isOpen) return null;
  
  return (
    <div
      className={cn(
        "absolute right-0 top-0 h-full bg-white border-l shadow-lg transition-all duration-300 z-50",
        isCollapsed ? "w-12" : "w-80"
      )}
    >
      <div className="relative h-full flex flex-col">
        <button
          onClick={toggleCollapse}
          className="absolute -left-3 top-12 bg-white rounded-full p-1 shadow-md border text-nyu-purple"
        >
          {isCollapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
        
        {!isCollapsed && (
          <>
            <div className="p-4 border-b bg-nyu-purple text-white">
              <h2 className="font-medium">TaskWhisper AI Assistant</h2>
              <p className="text-xs text-white/70">Recommended tasks for you</p>
            </div>
            
            <div className="flex-1 overflow-auto p-4 space-y-3">
              {tasks.length > 0 ? (
                tasks.map(task => (
                  <TaskCard 
                    key={task.id}
                    task={task}
                    onClick={() => onTaskClick(task.id)}
                    compact
                  />
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p className="text-sm">No suggested tasks right now</p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t bg-gray-50 text-xs text-gray-500">
              <p>TaskWhisper is learning from your habits</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskSidebar;
