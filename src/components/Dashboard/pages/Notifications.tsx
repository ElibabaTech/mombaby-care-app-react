import React from 'react';
import { Bell, Calendar, Clock, Info, X } from 'lucide-react';

const Notifications = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Notifications</h2>
            <button className="text-purple-600 hover:text-purple-700 text-sm">Mark all as read</button>
          </div>
        </div>

        <div className="divide-y">
          {[
            {
              title: 'Meal Plan Reminder',
              message: 'Time to prepare your lunch according to your meal plan',
              time: '10 minutes ago',
              type: 'reminder',
              icon: Calendar,
            },
            {
              title: 'New Article Available',
              message: 'Check out our latest article on pregnancy nutrition',
              time: '1 hour ago',
              type: 'update',
              icon: Info,
            },
            {
              title: 'Water Intake Alert',
              message: 'You haven\'t logged your water intake today',
              time: '2 hours ago',
              type: 'alert',
              icon: Bell,
            },
            {
              title: 'Appointment Reminder',
              message:  'Upcoming prenatal checkup tomorrow at 10 AM',
              time: '3 hours ago',
              type: 'reminder',
              icon: Clock,
            },
          ].map((notification, index) => (
            <div key={index} className="p-4 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-full ${
                  notification.type === 'reminder' ? 'bg-blue-100 text-blue-600' :
                  notification.type === 'alert' ? 'bg-red-100 text-red-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  <notification.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{notification.title}</h3>
                  <p className="text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-2">{notification.time}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Dismiss</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <button className="w-full text-center text-purple-600 hover:text-purple-700">
            View all notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;