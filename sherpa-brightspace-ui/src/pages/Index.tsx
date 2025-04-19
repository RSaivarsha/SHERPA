
import { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import TaskSidebar from '../components/TaskSidebar';
import MockBrowser from '../components/MockBrowser';
import { Task } from '../types/Task';
import { generateTasks } from '../utils/taskGenerator';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();
  
  // Simulate loading tasks based on patterns and time
  useEffect(() => {
    // Generate initial tasks
    const generatedTasks = generateTasks(currentTime);
    setTasks(generatedTasks);
    
    // Update current time every 5 seconds for testing (would be slower in production)
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      const updatedTasks = generateTasks(now);
      setTasks(updatedTasks);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleTaskClick = (taskId: number) => {
    const clickedTask = tasks.find(task => task.id === taskId);
    
    // In a real implementation, this would trigger the actual automation
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: 'running' } 
        : task
    ));
    
    // Show toast notification
    toast({
      title: `Running ${clickedTask?.title || 'Task'}`,
      description: "Automating this task for you...",
    });
    
    // Simulate task completion
    setTimeout(() => {
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? { ...task, status: 'completed' } 
          : task
      ));
      
      // Show completion toast
      toast({
        title: `Completed: ${clickedTask?.title || 'Task'}`,
        description: "Automation successfully completed",
      });
    }, 2000);
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-nyu-purple text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">TaskWhisper AI Assistant</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm hidden md:block">
              {currentTime.toLocaleString('en-US', { 
                weekday: 'long', 
                hour: 'numeric', 
                minute: 'numeric', 
                hour12: true 
              })}
            </span>
            <button 
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md transition-all"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex flex-1 container mx-auto my-6 px-4">
        <div className="flex flex-1 gap-6 flex-col md:flex-row">
          <Dashboard 
            tasks={tasks} 
            onTaskClick={handleTaskClick}
            className="w-full md:w-1/3"
          />
          <MockBrowser
            sidebarOpen={sidebarOpen}
            tasks={tasks}
            onTaskClick={handleTaskClick}
            className="w-full md:w-2/3 h-[600px]"
          />
        </div>
      </main>
      
      <footer className="bg-nyu-dark text-white p-4 mt-auto">
        <div className="container mx-auto text-center text-sm">
          TaskWhisper AI Assistant - Automating repetitive tasks for students
        </div>
      </footer>
    </div>
  );
};

export default Index;
