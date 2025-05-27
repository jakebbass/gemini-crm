
export interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  lastInteraction: string;
  avatarUrl?: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  attendees: string[];
  summary?: string;
}

export interface Task {
  id: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

export interface Metric {
  id: string;
  label: string;
  value: string | number;
  icon?: IconType; // Changed from React.ReactNode to IconType
}

export interface RecentActivity {
  id: string;
  description: string;
  timestamp: string;
  user: string; // or Contact
  type: 'call' | 'email' | 'meeting' | 'note';
}

export interface GeminiSummaryResponse {
  contactName?: string;
  status?: string;
  nextStep?: string;
  urgentInfo?: string;
  fullSummary: string;
}

// Enum for icon usage for example
export enum IconType {
  USER_GROUP = 'USER_GROUP',
  CALENDAR_DAYS = 'CALENDAR_DAYS',
  CHECK_CIRCLE = 'CHECK_CIRCLE',
  LIGHT_BULB = 'LIGHT_BULB',
}
