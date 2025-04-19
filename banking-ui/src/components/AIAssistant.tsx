
import React from "react";
import { ArrowRight } from "lucide-react";

interface SuggestedTask {
  title: string;
  onClick: () => void;
}

interface AIAssistantProps {
  suggestedTasks: SuggestedTask[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ suggestedTasks }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <div className="p-4 bg-primary text-white">
        <h3 className="font-semibold text-lg">Recommended Tasks</h3>
        <p className="text-sm text-white/90">Based on your banking habits</p>
      </div>
      <div className="bg-white p-4">
        <div className="space-y-2">
          {suggestedTasks.map((task, index) => (
            <button
              key={index}
              onClick={task.onClick}
              className="w-full p-3 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between group rounded-lg border border-gray-100"
            >
              <span className="text-sm text-gray-800">{task.title}</span>
              <ArrowRight className="text-primary size-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
