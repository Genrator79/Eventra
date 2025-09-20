import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'purple', 
  text = 'Loading...',
  fullScreen = false,
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const colorClasses = {
    purple: 'text-purple-600',
    pink: 'text-pink-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
    white: 'text-white',
    gray: 'text-gray-600'
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.medium;
  const spinnerColor = colorClasses[color] || colorClasses.purple;

  const SpinnerIcon = () => (
    <svg
      className={`animate-spin ${spinnerSize} ${spinnerColor}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center space-y-4">
          <SpinnerIcon />
          <p className={`text-lg font-medium ${spinnerColor}`}>{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <SpinnerIcon />
      {text && (
        <p className={`text-sm font-medium ${spinnerColor}`}>{text}</p>
      )}
    </div>
  );
};

// Card Skeleton Component for loading states
export const CardSkeleton = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse"
        >
          <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
          <div className="p-6 space-y-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Profile Skeleton Component
export const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECE4F2] via-[#EADCF5] to-[#D7C9E6] py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* User Info Skeleton */}
        <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 text-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-8 items-center w-full animate-pulse">
          <div className="w-36 h-36 bg-white/20 rounded-full"></div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-8 bg-white/20 rounded w-48"></div>
              <div className="h-4 bg-white/20 rounded w-32"></div>
              <div className="h-4 bg-white/20 rounded w-24"></div>
            </div>
            <div className="flex flex-col justify-center items-start md:items-end space-y-2">
              <div className="h-4 bg-white/20 rounded w-28"></div>
              <div className="h-4 bg-white/20 rounded w-36"></div>
              <div className="flex gap-4 mt-4">
                <div className="bg-white/20 rounded-full w-24 h-24"></div>
                <div className="bg-white/20 rounded-full w-24 h-24"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Events Skeleton */}
        <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-purple-200 rounded-2xl p-6 shadow-inner animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
