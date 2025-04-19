
import { useState } from 'react';
import { Task } from '../types/Task';
import TaskSidebar from './TaskSidebar';
import { cn } from '@/lib/utils';

interface MockBrowserProps {
  sidebarOpen: boolean;
  tasks: Task[];
  onTaskClick: (taskId: number) => void;
  className?: string;
}

const MockBrowser = ({ sidebarOpen, tasks, onTaskClick, className }: MockBrowserProps) => {
  const [activeTab, setActiveTab] = useState('brightspace');
  
  const handleTaskClick = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task?.title.toLowerCase().includes('zoom')) {
      setActiveTab('zoom');
    }
    onTaskClick(taskId);
  };
  
  return (
    <div className={cn("bg-white rounded-lg shadow-lg overflow-hidden flex flex-col", className)}>
      {/* Browser chrome */}
      <div className="bg-gray-200 p-2 flex items-center space-x-2">
        <div className="flex space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-sm text-gray-600 flex items-center">
          brightspace.nyu.edu
        </div>
      </div>
      
      {/* Browser tabs */}
      <div className="bg-gray-100 flex border-b px-2 pt-1">
        <button 
          className={cn(
            "px-4 py-1.5 text-sm rounded-t-md border-t border-l border-r",
            activeTab === 'brightspace' 
              ? "bg-white text-nyu-purple font-medium" 
              : "bg-gray-200 text-gray-700"
          )}
          onClick={() => setActiveTab('brightspace')}
        >
          Brightspace
        </button>
        <button 
          className={cn(
            "px-4 py-1.5 text-sm rounded-t-md border-t border-l border-r",
            activeTab === 'zoom' 
              ? "bg-white text-nyu-purple font-medium" 
              : "bg-gray-200 text-gray-700"
          )}
          onClick={() => setActiveTab('zoom')}
        >
          Zoom Meeting
        </button>
      </div>
      
      {/* Browser content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Brightspace Mock */}
        {activeTab === 'brightspace' && (
          <div className="h-full overflow-hidden">
            <div className="bg-nyu-purple p-4 text-white">
              <div className="flex items-center">
                <img 
                  src="https://www.nyu.edu/content/dam/nyu/advertisePublications/ideasideasLogo/nyu_short_white.svg" 
                  alt="NYU Logo" 
                  className="h-6 mr-2" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/lovable-uploads/96579ca1-dd5d-4d8f-84ad-1fc3a86fcef3.png";
                  }}
                />
                <span>NYU</span>
                <div className="flex-1"></div>
                <div className="space-x-4">
                  <span>Calendar</span>
                  <span>Announcements</span>
                  <span>Help</span>
                </div>
              </div>
            </div>
            <div className="h-[200px] bg-gradient-to-r from-nyu-dark to-nyu-light flex items-center px-8">
              <h1 className="text-3xl text-white font-light">Welcome to NYU Brightspace</h1>
            </div>
            <div className="p-6 bg-gray-100 h-[calc(100%-268px)] overflow-auto">
              <div className="bg-white p-4 rounded-md shadow mb-4">
                <h2 className="font-bold text-lg">My Courses</h2>
                <div className="mt-3 grid grid-cols-2 gap-4">
                  <div className="border rounded-md p-3 hover:border-nyu-purple cursor-pointer">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Spring 2025</span>
                    <h3 className="font-medium mt-1">DevOps Spring 2025 Wed</h3>
                    <p className="text-sm text-gray-600 mt-1">CSCI-GA 2820 003/4</p>
                  </div>
                  <div className="border rounded-md p-3 hover:border-nyu-purple cursor-pointer">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Spring 2025</span>
                    <h3 className="font-medium mt-1">Spec Top Computer SCI</h3>
                    <p className="text-sm text-gray-600 mt-1">CSCI-GA 3033 1_077</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg">Work To Do</h2>
                  <button className="text-xs text-nyu-purple">View All</button>
                </div>
                <div className="mt-3 space-y-3">
                  <div className="border-l-4 border-amber-500 pl-3">
                    <h3 className="font-medium">A3: Team Presentation on Company selection - SUBMIT A TEAM VIDEO</h3>
                    <p className="text-sm text-gray-600">Due Apr 2 • Communication for Courant Spring 2025</p>
                  </div>
                  <div className="border-l-4 border-amber-500 pl-3">
                    <h3 className="font-medium">A4b: Individual Feedback on Team Benchmark Presentation</h3>
                    <p className="text-sm text-gray-600">Due Apr 7 • Communication for Courant Spring 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Zoom Mock */}
        {activeTab === 'zoom' && (
          <div className="h-full bg-gray-900 text-white flex flex-col items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg text-center max-w-md">
              <h2 className="text-xl font-bold mb-4">DevOps Spring 2025 Meeting</h2>
              <p className="mb-6">Meeting ID: 123 456 7890</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 bg-gray-700 rounded-full mb-2 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" height="20" width="20" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15.5 12a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z"></path>
                      <path d="M19.5 12c0 .796-.182 1.55-.506 2.224a3.547 3.547 0 00-1.084-1.949.538.538 0 01-.116-.168 5.552 5.552 0 00.212-1.607A5.5 5.5 0 007.5 12c0 .547.072 1.08.214 1.575a.877.877 0 01-.116.18 3.286 3.286 0 00-1.084 1.95A6.5 6.5 0 1119.5 12z"></path>
                    </svg>
                  </div>
                  <span className="text-xs">Video</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 bg-gray-700 rounded-full mb-2 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" height="20" width="20" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-11V3"></path>
                      <circle cx="12" cy="11" r="1"></circle>
                    </svg>
                  </div>
                  <span className="text-xs">Audio</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 bg-gray-700 rounded-full mb-2 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" height="20" width="20" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="14" height="14" x="5" y="5" rx="2"></rect>
                      <path d="M12 12h.01"></path>
                    </svg>
                  </div>
                  <span className="text-xs">Share</span>
                </div>
              </div>
              <button className="w-full bg-nyu-purple hover:bg-nyu-light text-white py-2 rounded-md transition-colors">
                Joining Meeting...
              </button>
            </div>
          </div>
        )}
        
        {/* TaskSidebar overlayed on browser content */}
        <TaskSidebar 
          tasks={tasks}
          onTaskClick={handleTaskClick}
          isOpen={sidebarOpen}
        />
      </div>
    </div>
  );
};

export default MockBrowser;
