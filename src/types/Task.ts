
export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed';
export type TaskCategory = 'class' | 'assignment' | 'meeting' | 'general';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate?: Date;
  pattern: {
    day?: number[]; // 0-6 (Sunday-Saturday)
    timeRange?: {
      start: string; // HH:MM format
      end: string; // HH:MM format
    };
    frequency?: 'daily' | 'weekly' | 'monthly';
    lastAccessed?: Date;
  };
  url?: string;
  steps?: string[];
  category: TaskCategory;
  status: TaskStatus;
  confidence: number; // 0-100 - how confident the AI is that you want to do this task
}
