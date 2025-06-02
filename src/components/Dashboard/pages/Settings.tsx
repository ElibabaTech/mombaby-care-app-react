import React from 'react';
import { User, Lock, Bell, Shield } from 'lucide-react';

const Settings = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-white rounded-lg shadow divide-y">
        {/* Profile Settings */}
        <div className="p-6">
          <div className="flex items-center mb-4">
            <User className="h-6 w-6 text-purple-500 mr-3" />
            <h2 className="text-xl font-semibold">Profile Settings</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Lock className="h-6 w-6 text-purple-500 mr-3" />
            <h2 className="text-xl font-semibold">Security</h2>
          </div>
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-2 border rounded-md hover:bg-gray-50">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-2 border rounded-md hover:bg-gray-50">
              Two-Factor Authentication
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-6 w-6 text-purple-500 mr-3" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          <div className="space-y-4">
            {[
              'Email Notifications',
              'Push Notifications',
              'SMS Notifications',
              'Reminder Alerts',
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700">{setting}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-purple-500 mr-3" />
            <h2 className="text-xl font-semibold">Privacy</h2>
          </div>
          <div className="space-y-4">
            {[
              'Profile Visibility',
              'Data Sharing',
              'Activity Status',
              'Connected Apps',
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700">{setting}</span>
                <select className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500">
                  <option>Public</option>
                  <option>Private</option>
                  <option>Friends Only</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;