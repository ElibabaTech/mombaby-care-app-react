import React from 'react';
import { Baby, Ruler, Weight, Calendar } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BabyProgress = () => {
  // Simulated AI-generated growth predictions
  const growthData = {
    labels: ['1mo', '2mo', '3mo', '4mo', '5mo', '6mo', '7mo', '8mo'],
    datasets: [
      {
        label: 'Weight (kg)',
        data: [3.5, 4.8, 5.9, 6.7, 7.2, 7.8, 8.3, 8.8],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
      },
      {
        label: 'Predicted Weight (kg)',
        data: [3.5, 4.8, 5.9, 6.7, 7.2, 7.8, 8.5, 9.2],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderDash: [5, 5],
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Baby Growth Chart'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Weight (kg)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Age'
        }
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Baby Progress Tracker</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <Weight className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Current Weight</h3>
              <p className="text-2xl font-bold">7.2 kg</p>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded">
            <div className="h-2 bg-purple-500 rounded" style={{ width: '75%' }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">75th percentile</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <Ruler className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Height</h3>
              <p className="text-2xl font-bold">68 cm</p>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded">
            <div className="h-2 bg-blue-500 rounded" style={{ width: '80%' }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">80th percentile</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <Calendar className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Age</h3>
              <p className="text-2xl font-bold">6 months</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Next checkup in 2 weeks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Growth Chart</h2>
          <div className="h-[400px]">
            <Line options={options} data={growthData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Milestones</h2>
          <div className="space-y-4">
            {[
              { milestone: 'First Smile', status: 'Achieved', date: '2 months' },
              { milestone: 'Rolling Over', status: 'Achieved', date: '4 months' },
              { milestone: 'Sitting Without Support', status: 'In Progress', date: '6 months' },
              { milestone: 'First Words', status: 'Upcoming', date: '9-12 months' },
            ].map((milestone, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{milestone.milestone}</p>
                  <p className="text-sm text-gray-500">{milestone.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  milestone.status === 'Achieved' ? 'bg-green-100 text-green-800' :
                  milestone.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {milestone.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BabyProgress;