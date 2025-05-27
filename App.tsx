
import React, { useState } from 'react';
import { Header } from './components/Header';
import { DashboardLayout } from './components/DashboardLayout';
import { MetricCard } from './components/cards/MetricCard';
import { TranscriptSummarizerCard } from './components/cards/TranscriptSummarizerCard';
import { RecentActivitiesCard } from './components/cards/RecentActivitiesCard';
import { TaskListCard } from './components/cards/TaskListCard';
import { ManualTranscriptInputCard } from './components/cards/ManualTranscriptInputCard'; // New Import
import { MOCK_METRICS, MOCK_RECENT_ACTIVITIES, MOCK_TASKS, APP_TITLE } from './constants';
import { IconType } from './types';

// A simple Icon component to render SVG paths
const Icon: React.FC<{ type: IconType; className?: string }> = ({ type, className = "w-6 h-6" }) => {
  switch (type) {
    case IconType.USER_GROUP:
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>;
    case IconType.CALENDAR_DAYS:
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-3.75h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" /></svg>;
    case IconType.CHECK_CIRCLE:
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
    case IconType.LIGHT_BULB:
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.354a15.055 15.055 0 0 1-4.5 0M12 3v2.25m0 0c-.06.011-.119.024-.177.037M12 5.25c.06.011.119.024.177.037m0 0a2.25 2.25 0 0 1 2.087 2.087M12 5.25a2.25 2.25 0 0 0-2.087 2.087m0 0a2.25 2.25 0 0 1 2.087 2.087m0 0a2.25 2.25 0 0 0 2.087 2.087M12 9.75a2.25 2.25 0 0 1 2.087 2.087M12 9.75a2.25 2.25 0 0 0-2.087 2.087m0 0A2.25 2.25 0 0 1 7.913 12m0 0A2.25 2.25 0 0 0 12 14.087m0 0L12 18Zm0 0c.06.011.119.024.177.037M12 18c-.06.011-.119.024-.177.037M12 18c.609 0 1.201-.059 1.77-.161M12 18c-.609 0-1.201-.059-1.77-.161m0 0A2.25 2.25 0 0 1 7.913 12M16.087 12A2.25 2.25 0 0 1 12 14.087" /></svg>;
    default:
      return null;
  }
};


const App: React.FC = () => {
  const [currentTranscript, setCurrentTranscript] = useState<string>('');

  return (
    <div className="min-h-screen flex flex-col">
      <Header title={APP_TITLE} />
      <main className="flex-grow p-4 sm:p-6 lg:p-8">
        <DashboardLayout>
          {MOCK_METRICS.map(metric => (
            <MetricCard
              key={metric.id}
              label={metric.label}
              value={metric.value}
              icon={metric.icon ? <Icon type={metric.icon} className="w-8 h-8 text-blue-500" /> : undefined}
            />
          ))}
          <ManualTranscriptInputCard 
            onTranscriptSubmit={setCurrentTranscript} 
            className="md:col-span-2 lg:col-span-2" 
          />
          <TranscriptSummarizerCard
            transcript={currentTranscript}
            onTranscriptChange={setCurrentTranscript}
            className="md:col-span-2 lg:col-span-2"
          />
          <RecentActivitiesCard activities={MOCK_RECENT_ACTIVITIES} className="lg:col-span-2" />
          <TaskListCard tasks={MOCK_TASKS} className="lg:col-span-2" />
        </DashboardLayout>
      </main>
      <footer className="text-center p-4 text-sm text-slate-500 border-t border-slate-200">
        © {new Date().getFullYear()} CRM Autopilot Dashboard. For demonstration purposes.
      </footer>
    </div>
  );
};

export default App;
