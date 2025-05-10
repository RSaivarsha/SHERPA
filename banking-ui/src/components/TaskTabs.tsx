
import React from "react";
import { cn } from "@/lib/utils";

interface TaskTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TaskTabs: React.FC<TaskTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "all", label: "All Tasks" },
    { id: "payments", label: "Payments" },
    { id: "transfers", label: "Transfers" },
  ];

  return (
    <div className="flex space-x-2 mb-4 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            activeTab === tab.id
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TaskTabs;
