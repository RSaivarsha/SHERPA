
import React, { useState } from "react";
import TaskCard from "@/components/TaskCard";
import TaskTabs from "@/components/TaskTabs";
import RecentActivity from "@/components/RecentActivity";
import AIAssistant from "@/components/AIAssistant";
import BankingInterface from "@/components/BankingInterface";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [lastCompletedTask, setLastCompletedTask] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Task data
  const taskData = [
    {
      id: "rent",
      category: "Payment",
      title: "Pay Monthly Rent",
      subtitle: "Upcoming monthly rent payment due.",
      details: "Usually paid: 1st day of the month",
      usuallyDone: "08:00 - 12:00",
      match: 95,
      tab: "payments",
    },
    {
      id: "creditCard",
      category: "Payment",
      title: "Credit Card Bill Payment",
      subtitle: "Scheduled credit card payment to Citi Bank.",
      details: "Due: May 5, 2025",
      usuallyDone: "15:00 - 18:00",
      match: 90,
      tab: "payments",
    },
    {
      id: "savings",
      category: "Transfer",
      title: "Transfer to Savings",
      subtitle: "Monthly savings transfer.",
      details: "Usually on: 15th of the month",
      usuallyDone: "10:00 - 14:00",
      match: 85,
      tab: "transfers",
    },
  ];

  // Filter tasks based on active tab
  const filteredTasks = taskData.filter(
    (task) => activeTab === "all" || task.tab === activeTab
  );

  // Recent activity data
  const recentActivities = [
    {
      action: "Paid rent",
      time: "Tue, 9:15 AM",
      color: "bg-green-500",
    },
    {
      action: "Transferred funds to savings",
      time: "Mon, 3:45 PM",
      color: "bg-blue-500",
    },
    {
      action: "Reviewed investment portfolio",
      time: "Sun, 6:00 PM",
      color: "bg-purple-500",
    },
  ];
  
  const handleTaskComplete = (title: string) => {
    setLastCompletedTask(title);
    
    // Reset after a delay to remove the notification
    setTimeout(() => {
      setLastCompletedTask(null);
    }, 10000);
  };

  const handleSuggestedTaskClick = (title: string) => {
    console.log("Automating " + title);
    toast({
      title: `Running ${title}`,
      description: "Automating this task for you...",
      duration: 3000,
    });
    
    setTimeout(() => {
      toast({
        title: `Completed: ${title}`,
        description: "Automation successfully completed",
        duration: 5000,
      });
      setLastCompletedTask(title);
      
      // Reset after a delay
      setTimeout(() => {
        setLastCompletedTask(null);
      }, 10000);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-[1600px] mx-auto px-4">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Task Dashboard */}
          <div className="col-span-12 lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1">Financial Task Dashboard</h1>
              <p className="text-gray-600">Manage and automate your financial tasks</p>
            </div>
            
            <TaskTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  category={task.category}
                  title={task.title}
                  subtitle={task.subtitle}
                  details={task.details}
                  usuallyDone={task.usuallyDone}
                  match={task.match}
                  onComplete={handleTaskComplete}
                />
              ))}
            </div>
            
            <RecentActivity activities={recentActivities} />
          </div>

          {/* Middle Column - Banking Interface */}
          <div className="col-span-12 lg:col-span-6">
            <BankingInterface lastCompletedTask={lastCompletedTask} />
          </div>

          {/* Right Column - AI Assistant */}
          <div className="col-span-12 lg:col-span-3">
            <AIAssistant
              suggestedTasks={[
                {
                  title: "Pay Monthly Rent",
                  onClick: () => handleSuggestedTaskClick("Pay Monthly Rent"),
                },
                {
                  title: "Credit Card Bill Payment",
                  onClick: () => handleSuggestedTaskClick("Credit Card Bill Payment"),
                },
                {
                  title: "Transfer to Savings",
                  onClick: () => handleSuggestedTaskClick("Transfer to Savings"),
                },
                {
                  title: "Review Investment Portfolio",
                  onClick: () => handleSuggestedTaskClick("Review Investment Portfolio"),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
