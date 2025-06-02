import React, { useState } from 'react';
import { PieChart, Apple, Droplets, Coffee, AlertTriangle } from 'lucide-react';

const DietTracking = () => {
  const [showRecommendation, setShowRecommendation] = useState(false);

  // Simulated AI-generated recommendations
  const nutritionRecommendations = {
    title: "Pregnancy-Safe Diet Recommendations",
    warnings: ["Avoid raw fish", "Limit caffeine intake"],
    suggestions: [
      "Increase folic acid intake with leafy greens",
      "Add more calcium-rich foods",
      "Include iron-rich proteins"
    ]
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Diet Tracking</h1>

      {/* AI Recommendations Alert */}
      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="h-6 w-6 text-purple-500 mr-3" />
          <div>
            <h3 className="font-semibold">Personalized AI Recommendations</h3>
            <p className="text-sm text-gray-600">Based on your pregnancy stage (Week 24)</p>
            <button 
              onClick={() => setShowRecommendation(true)}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium mt-2"
            >
              View Recommendations
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <PieChart className="h-10 w-10 text-purple-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Calories</h3>
              <p className="text-2xl font-bold">1,200/2,000</p>
              <p className="text-sm text-gray-500">Pregnancy Goal: 2,200</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Apple className="h-10 w-10 text-green-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Nutrients</h3>
              <p className="text-2xl font-bold">75%</p>
              <p className="text-sm text-gray-500">Essential vitamins tracked</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Droplets className="h-10 w-10 text-blue-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Water</h3>
              <p className="text-2xl font-bold">6/8 cups</p>
              <p className="text-sm text-gray-500">Pregnancy hydration</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Coffee className="h-10 w-10 text-yellow-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Caffeine</h3>
              <p className="text-2xl font-bold">150mg</p>
              <p className="text-sm text-red-500">Near daily limit (200mg)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Today's Food Log</h2>
        <div className="space-y-4">
          {[
            { 
              meal: 'Breakfast', 
              time: '8:00 AM', 
              items: ['Oatmeal', 'Banana', 'Green Tea'],
              nutrients: {
                folicAcid: '200mcg',
                iron: '4mg',
                calcium: '100mg'
              }
            },
            { 
              meal: 'Lunch', 
              time: '12:30 PM', 
              items: ['Quinoa Bowl', 'Grilled Vegetables'],
              nutrients: {
                folicAcid: '300mcg',
                iron: '6mg',
                calcium: '150mg'
              }
            },
            { 
              meal: 'Snack', 
              time: '3:00 PM', 
              items: ['Greek Yogurt', 'Almonds'],
              nutrients: {
                folicAcid: '50mcg',
                iron: '2mg',
                calcium: '300mg'
              }
            },
            { 
              meal: 'Dinner', 
              time: '7:00 PM', 
              items: ['Grilled Salmon', 'Brown Rice', 'Broccoli'],
              nutrients: {
                folicAcid: '250mcg',
                iron: '8mg',
                calcium: '200mg'
              }
            },
          ].map((log, index) => (
            <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-800">{log.meal}</h3>
                <p className="text-sm text-gray-500">{log.time}</p>
                <ul className="mt-2 space-y-1">
                  {log.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-600">• {item}</li>
                  ))}
                </ul>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Folic Acid:</span> {log.nutrients.folicAcid}
                  </div>
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Iron:</span> {log.nutrients.iron}
                  </div>
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Calcium:</span> {log.nutrients.calcium}
                  </div>
                </div>
              </div>
              <button className="text-purple-600 hover:text-purple-700">Edit</button>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations Modal */}
      {showRecommendation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">{nutritionRecommendations.title}</h2>
            
            <div className="mb-4">
              <h3 className="font-semibold text-red-600 mb-2">Important Warnings</h3>
              <ul className="space-y-2">
                {nutritionRecommendations.warnings.map((warning, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                    {warning}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-green-600 mb-2">Suggested Foods</h3>
              <ul className="space-y-2">
                {nutritionRecommendations.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Apple className="h-4 w-4 text-green-500 mr-2" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setShowRecommendation(false)}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietTracking;