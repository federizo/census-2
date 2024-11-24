import React, { useState } from "react";

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
      const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      {/* Card Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isCollapsed ? "▼" : "▲"}
        </button>
      </div>
      {/* Card Content (conditionally rendered based on collapse state) */}
      {!isCollapsed && <div className="mt-4">{children}</div>}
    </div>
  );
}

export default Card;
