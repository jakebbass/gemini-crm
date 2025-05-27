
import { Metric, RecentActivity, Task, IconType } from './types';

export const APP_TITLE = "CRM Autopilot Dashboard";

export const MOCK_METRICS: Metric[] = [
  { id: '1', label: 'New Contacts This Month', value: 12, icon: IconType.USER_GROUP },
  { id: '2', label: 'Meetings Scheduled This Week', value: 5, icon: IconType.CALENDAR_DAYS },
  { id: '3', label: 'Tasks Completed Today', value: 8, icon: IconType.CHECK_CIRCLE },
  { id: '4', label: 'Insights Generated', value: 23, icon: IconType.LIGHT_BULB },
];

export const MOCK_RECENT_ACTIVITIES: RecentActivity[] = [
  { id: 'act1', description: 'Logged a call with Acme Corp.', timestamp: '2 hours ago', user: 'AI Assistant', type: 'call' },
  { id: 'act2', description: 'Generated summary for "Project Phoenix Strategy Meeting".', timestamp: '5 hours ago', user: 'AI Assistant', type: 'meeting' },
  { id: 'act3', description: 'Sent follow-up email to Beta Solutions.', timestamp: 'Yesterday', user: 'AI Assistant', type: 'email' },
  { id: 'act4', description: 'Added new contact: Gamma Innovations.', timestamp: '2 days ago', user: 'AI Assistant', type: 'note' },
];

export const MOCK_TASKS: Task[] = [
  { id: 'task1', description: 'Follow up with John Doe regarding proposal', dueDate: 'Tomorrow', isCompleted: false, priority: 'High' },
  { id: 'task2', description: 'Prepare presentation for Q3 review', dueDate: 'In 3 days', isCompleted: false, priority: 'Medium' },
  { id: 'task3', description: 'Research new market trends for SaaS', dueDate: 'Next week', isCompleted: true, priority: 'Low' },
  { id: 'task4', description: 'Schedule demo with Potential Client X', dueDate: 'Today', isCompleted: false, priority: 'High' },
];

export const GEMINI_SUMMARIZATION_PROMPT_TEMPLATE = (transcript: string): string => `
Summarize the following meeting transcript for a CRM. Extract the following information if available:
- Contact Name(s) involved in the meeting.
- Current Status or sentiment of the contact/deal.
- Key Next Steps agreed upon or required.
- Any Urgent information or action items.
- A concise overall summary of the meeting.

Format your response as a JSON object with the keys: "contactName", "status", "nextStep", "urgentInfo", and "fullSummary".
If a piece of information is not found, use an empty string or "N/A" for its value.

Transcript:
\`\`\`
${transcript}
\`\`\`

JSON Response:
`;

export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';
