
import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

interface TaskCardProps {
  category: string;
  title: string;
  subtitle: string;
  details: string;
  usuallyDone: string;
  match: number;
  onComplete?: (title: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  category,
  title,
  subtitle,
  details,
  usuallyDone,
  match,
  onComplete,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  const handleRunAutomation = () => {
    setIsRunning(true);
    toast({
      title: `Running ${title}`,
      description: "Automating this task for you...",
      duration: 3000,
    });

    setTimeout(() => {
      setIsRunning(false);
      setIsCompleted(true);
      toast({
        title: `Completed: ${title}`,
        description: "Automation successfully completed",
        duration: 5000,
      });
      if (onComplete) {
        onComplete(title);
      }
    }, 3000);
  };

  return (
    <Card className="w-full bg-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              {category}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-800">
              {match}% Match
            </span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{subtitle}</p>
        <div className="text-xs text-gray-500 space-y-1">
          <p>{details}</p>
          <p>Usually done: {usuallyDone}</p>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <button
            onClick={handleRunAutomation}
            disabled={isRunning || isCompleted}
            className={`w-full flex items-center justify-center gap-2 font-medium transition-colors text-sm p-2 rounded-md ${
              isCompleted
                ? "bg-green-50 text-green-700"
                : "text-primary hover:text-primary/90"
            }`}
          >
            {isRunning ? (
              <>
                <div className="h-4 w-4 border-2 border-current border-t-transparent animate-spin rounded-full" />
                Running...
              </>
            ) : isCompleted ? (
              <>
                <Check size={16} />
                Completed
              </>
            ) : (
              <>
                Run Automation 
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
