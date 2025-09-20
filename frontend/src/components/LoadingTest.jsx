import React, { useState } from 'react';
import LoadingSpinner, { CardSkeleton, ProfileSkeleton } from './LoadingSpinner';

const LoadingTest = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">Loading Components Test</h1>
        
        {/* Spinner Tests */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Loading Spinners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <h3 className="text-sm font-medium mb-2">Small</h3>
              <LoadingSpinner size="small" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium mb-2">Medium</h3>
              <LoadingSpinner size="medium" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium mb-2">Large</h3>
              <LoadingSpinner size="large" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium mb-2">XLarge</h3>
              <LoadingSpinner size="xlarge" />
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="text-center">
              <h3 className="text-sm font-medium mb-2">With Text</h3>
              <LoadingSpinner size="medium" text="Loading data..." />
            </div>
            <div className="text-center">
              <button 
                onClick={() => setShowSpinner(!showSpinner)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {showSpinner ? 'Hide' : 'Show'} Full Screen Spinner
              </button>
            </div>
          </div>
        </div>

        {/* Card Skeleton Test */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Card Skeletons</h2>
          <button 
            onClick={() => setShowCards(!showCards)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4"
          >
            {showCards ? 'Hide' : 'Show'} Card Skeletons
          </button>
          {showCards && <CardSkeleton count={4} />}
        </div>

        {/* Profile Skeleton Test */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Profile Skeleton</h2>
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 mb-4"
          >
            {showProfile ? 'Hide' : 'Show'} Profile Skeleton
          </button>
          {showProfile && <ProfileSkeleton />}
        </div>
      </div>

      {/* Full Screen Spinner */}
      {showSpinner && (
        <LoadingSpinner 
          fullScreen={true} 
          text="This is a full screen loading spinner" 
        />
      )}
    </div>
  );
};

export default LoadingTest;
