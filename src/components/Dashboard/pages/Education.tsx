import React from 'react';
import { BookOpen, Video, FileText, Award, ShieldCheck } from 'lucide-react';

const Education = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Educational Resources</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          {
            title: 'Nutrition Basics',
            description: 'Learn about essential nutrients for pregnancy and infant development',
            icon: BookOpen,
            progress: 60,
          },
          {
            title: 'Food Safety',
            description: 'Guidelines for safe food handling and preparation',
            icon: ShieldCheck,
            progress: 45,
          },
          {
            title: 'Meal Planning',
            description: 'Tips for creating balanced and healthy meal plans',
            icon: FileText,
            progress: 30,
          },
        ].map((course, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <course.icon className="h-8 w-8 text-purple-500" />
              <h3 className="ml-3 text-lg font-semibold">{course.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                    Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-purple-600">
                    {course.progress}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                <div
                  style={{ width: `${course.progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Latest Articles</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Essential Nutrients During Pregnancy',
                category: 'Nutrition',
                readTime: '5 min read',
              },
              {
                title: 'Safe Food Practices for New Parents',
                category: 'Safety',
                readTime: '7 min read',
              },
              {
                title: 'Introducing Solid Foods to Your Baby',
                category: 'Infant Care',
                readTime: '6 min read',
              },
            ].map((article, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                <FileText className="h-6 w-6 text-purple-500" />
                <div>
                  <h3 className="font-medium text-gray-900">{article.title}</h3>
                  <div className="flex items-center mt-1 space-x-2 text-sm text-gray-500">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Video Tutorials</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Healthy Meal Prep for Pregnancy',
                duration: '15:30',
                thumbnail: 'meal-prep-thumbnail.jpg',
              },
              {
                title: 'Baby Food Making Guide',
                duration: '12:45',
                thumbnail: 'baby-food-thumbnail.jpg',
              },
              {
                title: 'Understanding Food Labels',
                duration: '08:20',
                thumbnail: 'food-labels-thumbnail.jpg',
              },
            ].map((video, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                <Video className="h-6 w-6 text-purple-500" />
                <div>
                  <h3 className="font-medium text-gray-900">{video.title}</h3>
                  <p className="text-sm text-gray-500">{video.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;