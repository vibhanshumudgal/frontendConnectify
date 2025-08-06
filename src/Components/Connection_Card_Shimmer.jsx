// Connection_Card_Shimmer.jsx
import React from "react";

const Connection_Card_Shimmer = () => {
  return (
    <div
      className="w-full bg-gray-900 px-6 py-4 border-b border-gray-700 
                 animate-pulse flex items-center justify-between"
    >
      {/* Left Section: Name, Gender, About */}
      <div className="flex items-center gap-6 overflow-hidden w-full">
        <div>
          <div className="h-5 w-32 bg-gray-700 rounded mb-2"></div>
          <div className="h-3 w-16 bg-gray-700 rounded"></div>
        </div>

        <div className="h-3 w-40 bg-gray-700 rounded hidden md:block"></div>

        <div className="h-3 w-32 bg-gray-700 rounded ml-auto"></div>
      </div>

      {/* Right Button Placeholder */}
      <div className="bg-gray-700 h-8 w-16 rounded"></div>
    </div>
  );
};

export default Connection_Card_Shimmer;
