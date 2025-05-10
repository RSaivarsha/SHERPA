
import React from "react";
import { Card } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const spendingData = [
  { month: "Jan", amount: 1200 },
  { month: "Feb", amount: 1850 },
  { month: "Mar", amount: 1400 },
  { month: "Apr", amount: 2100 },
  { month: "May", amount: 1700 },
  { month: "Jun", amount: 1450 },
];

const transactions = [
  { description: "Grocery Store", amount: -85.72, date: "Today, 2:34 PM" },
  { description: "Direct Deposit - Payroll", amount: 1850.00, date: "Yesterday, 9:00 AM" },
  { description: "Electric Company", amount: -145.30, date: "Apr 15, 2025" },
  { description: "Online Shopping", amount: -65.99, date: "Apr 14, 2025" },
];

interface BankingInterfaceProps {
  lastCompletedTask?: string | null;
}

const BankingInterface: React.FC<BankingInterfaceProps> = ({ lastCompletedTask }) => {
  return (
    <Card className="h-full bg-white shadow-lg border-0">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold">Account Overview</h2>
          <span className="text-sm text-gray-500">Last updated: Just now</span>
        </div>

        <div className="grid gap-6">
          {/* Account Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Checking Account */}
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">Checking Account</h3>
                  <p className="text-sm text-gray-500">**** 4567</p>
                </div>
                <span className="text-xl font-semibold">$3,241.50</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="text-sm text-primary hover:text-primary/90 font-medium">
                  View Transactions
                </button>
                <span className="text-gray-300">|</span>
                <button className="text-sm text-primary hover:text-primary/90 font-medium">
                  Transfer Money
                </button>
              </div>
            </div>

            {/* Savings Account */}
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">Savings Account</h3>
                  <p className="text-sm text-gray-500">**** 7890</p>
                </div>
                <span className="text-xl font-semibold">$12,458.32</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="text-sm text-primary hover:text-primary/90 font-medium">
                  View Transactions
                </button>
                <span className="text-gray-300">|</span>
                <button className="text-sm text-primary hover:text-primary/90 font-medium">
                  Transfer Money
                </button>
              </div>
            </div>
          </div>

          {/* Last Completed Task Alert (conditionally rendered) */}
          {lastCompletedTask && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md animate-fade-in">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    <span className="font-medium">Success!</span> {lastCompletedTask} has been completed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Monthly Spending Chart */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">Monthly Spending</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spendingData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#00A3FF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {transactions.map((transaction, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-sm">{transaction.description}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                  <span className={`font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-gray-800'}`}>
                    {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button className="p-3 text-sm border rounded-lg hover:bg-gray-50 transition-colors">
                Send Money
              </button>
              <button className="p-3 text-sm border rounded-lg hover:bg-gray-50 transition-colors">
                Pay Bills
              </button>
              <button className="p-3 text-sm border rounded-lg hover:bg-gray-50 transition-colors">
                Transfer Funds
              </button>
              <button className="p-3 text-sm border rounded-lg hover:bg-gray-50 transition-colors">
                Deposit Check
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BankingInterface;
