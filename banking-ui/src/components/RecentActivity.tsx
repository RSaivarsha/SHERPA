
import React from "react";

interface Activity {
  action: string;
  time: string;
  color: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
      <div className="rounded-lg border border-gray-100 bg-white p-4">
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-1.5 ${activity.color}`} />
              <div>
                <p className="text-sm text-gray-800">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
