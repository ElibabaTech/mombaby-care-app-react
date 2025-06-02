import React from 'react';
import { Brain, ShieldCheck, Search, MessageSquare } from 'lucide-react';

const Innovation = () => {
  return (
    <div id="innovation" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Innovation</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Powered by Advanced Technology
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Our AI-driven platform revolutionizes maternal and infant nutrition management
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="bg-purple-100 rounded-lg p-3 inline-block">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Machine Learning</h3>
              <p className="mt-2 text-gray-500">
                Personalized nutrition recommendations based on your unique needs and preferences
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="bg-purple-100 rounded-lg p-3 inline-block">
                <ShieldCheck className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Safety Analysis</h3>
              <p className="mt-2 text-gray-500">
                Real-time detection of allergens and toxins in food products
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="bg-purple-100 rounded-lg p-3 inline-block">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">NLP Processing</h3>
              <p className="mt-2 text-gray-500">
                Advanced natural language processing for intuitive interaction and guidance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Innovation;