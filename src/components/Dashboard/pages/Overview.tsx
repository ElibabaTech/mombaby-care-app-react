import React from 'react';
import { Activity, TrendingUp, AlertCircle, Award } from 'lucide-react';

const Overview = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Activity className="h-10 w-10 text-purple-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Daily Progress</h3>
              <p className="text-2xl font-bold">85%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <TrendingUp className="h-10 w-10 text-green-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Weekly Goals</h3>
              <p className="text-2xl font-bold">12/15</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <AlertCircle className="h-10 w-10 text-yellow-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Alerts</h3>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Award className="h-10 w-10 text-blue-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Achievements</h3>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { title: 'Logged breakfast', time: '2 hours ago' },
              { title: 'Completed daily water intake', time: '4 hours ago' },
              { title: 'Updated weight tracker', time: '6 hours ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <span className="text-gray-800">{activity.title}</span>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Upcoming Reminders</h2>
          <div className="space-y-4">
            {[
              { title: 'Prenatal Checkup', date: 'Tomorrow, 10:00 AM' },
              { title: 'Take Vitamins', date: 'Daily, 9:00 AM' },
              { title: 'Log Weight', date: 'Weekly, Sunday' },
            ].map((reminder, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <span className="text-gray-800">{reminder.title}</span>
                <span className="text-sm text-gray-500">{reminder.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;