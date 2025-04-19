
import { Task, TaskStatus } from '../types/Task';

// Utility to check if current time is within a range
const isInTimeRange = (currentTime: Date, start: string, end: string): boolean => {
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);
  
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  
  const currentTotalMinutes = currentHour * 60 + currentMinute;
  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;
  
  return currentTotalMinutes >= startTotalMinutes && currentTotalMinutes <= endTotalMinutes;
};

// Sample tasks database that would normally be learned from user behavior
const sampleTasks: Task[] = [
  {
    id: 1,
    title: 'Join DevOps Class Zoom Meeting',
    description: 'Your DevOps class starts in 5 minutes',
    pattern: {
      day: [3], // Wednesday
      timeRange: {
        start: '16:50', // 4:50 PM
        end: '17:05', // 5:05 PM
      },
      frequency: 'weekly',
    },
    url: 'https://nyu.zoom.us/j/123456789',
    steps: [
      'Navigate to DevOps course page',
      'Click on Zoom meeting link',
      'Join with computer audio'
    ],
    category: 'class',
    status: 'pending',
    confidence: 95
  },
  {
    id: 2,
    title: 'Complete Stern Assignment',
    description: 'You usually work on Stern assignments around this time',
    pattern: {
      day: [1, 3, 5], // Monday, Wednesday, Friday
      timeRange: {
        start: '19:00', // 7:00 PM
        end: '22:00', // 10:00 PM
      },
      frequency: 'weekly',
    },
    url: 'https://brightspace.nyu.edu/assignments/stern',
    steps: [
      'Navigate to Stern course',
      'Open current week\'s assignment',
      'Download materials'
    ],
    category: 'assignment',
    status: 'pending',
    confidence: 85
  },
  {
    id: 3,
    title: 'Submit Team Video for Communication Class',
    description: 'Due Apr 2 - Communication for Courant Spring 2025',
    pattern: {
      day: [0, 1, 2, 3, 4, 5, 6], // Every day as deadline approaches
      timeRange: {
        start: '08:00', // 8:00 AM
        end: '23:59', // 11:59 PM
      },
      frequency: 'daily',
    },
    dueDate: new Date('2025-04-02T23:59:59'),
    url: 'https://brightspace.nyu.edu/d2l/lms/dropbox/user/folder_submit_files.d2l?db=8432&grpid=0&isprv=0&bp=0&ou=234554',
    steps: [
      'Navigate to Communication for Courant course',
      'Open "SUBMIT A TEAM VIDEO" assignment',
      'Upload completed video file',
      'Submit assignment'
    ],
    category: 'assignment',
    status: 'pending',
    confidence: 90
  },
  {
    id: 4,
    title: 'Check Team Benchmark Feedback',
    description: 'Individual feedback is available for your recent presentation',
    pattern: {
      day: [1, 2, 3, 4, 5], // Weekdays
      timeRange: {
        start: '10:00', // 10:00 AM
        end: '16:00', // 4:00 PM
      },
      frequency: 'daily',
    },
    url: 'https://brightspace.nyu.edu/d2l/lms/feedback/user/feedback.d2l?ou=234554',
    steps: [
      'Navigate to Communication course',
      'Open Team Benchmark Presentation',
      'View feedback comments'
    ],
    category: 'general',
    status: 'pending',
    confidence: 70
  },
  {
    id: 5,
    title: 'Join DevOps Zoom Meeting',
    description: 'Your DevOps class starts soon. Click to join the Zoom meeting.',
    pattern: {
      day: [0, 1, 2, 3, 4, 5, 6], // Show every day for testing
      timeRange: {
        start: '00:00', // All day for testing
        end: '23:59',
      },
      frequency: 'daily', // Changed to daily for testing
    },
    url: 'https://nyu.zoom.us/j/123456789',
    steps: [
      'Open DevOps course tab',
      'Click on Zoom meeting link',
      'Join meeting with computer audio'
    ],
    category: 'class',
    status: 'pending',
    confidence: 95
  }
];

// Function to generate relevant tasks based on current time
export const generateTasks = (currentTime: Date): Task[] => {
  const dayOfWeek = currentTime.getDay();
  const relevantTasks: Task[] = [];
  
  // Filter tasks based on day and time
  sampleTasks.forEach(task => {
    // Check if this task is relevant for today
    if (task.pattern.day && task.pattern.day.includes(dayOfWeek)) {
      // Check if this task is relevant for current time
      if (task.pattern.timeRange && 
          isInTimeRange(currentTime, task.pattern.timeRange.start, task.pattern.timeRange.end)) {
        
        // Deep clone to avoid mutations
        relevantTasks.push({...task, status: 'pending'});
      }
    }
    
    // Special case for assignments with upcoming deadlines
    if (task.dueDate) {
      const daysUntilDue = Math.ceil((task.dueDate.getTime() - currentTime.getTime()) / (1000 * 3600 * 24));
      
      if (daysUntilDue <= 3 && daysUntilDue >= 0) {
        // Increase confidence as deadline approaches
        const urgencyConfidence = task.confidence + ((3 - daysUntilDue) * 5);
        relevantTasks.push({
          ...task, 
          confidence: Math.min(urgencyConfidence, 99),
          description: `Due in ${daysUntilDue === 0 ? 'less than a day' : `${daysUntilDue} days`}`
        });
      }
    }
  });
  
  // Add the DevOps Zoom task for testing
  if (!relevantTasks.some(task => task.id === 5)) {
    relevantTasks.push({...sampleTasks.find(task => task.id === 5)!, status: 'pending'});
  }
  
  // Sort by confidence
  return relevantTasks.sort((a, b) => b.confidence - a.confidence);
};
