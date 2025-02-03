import React from 'react';

interface StoryProps {
  title: string;
  content: string;
}

const Story: React.FC<StoryProps> = ({ title, content }) => {
  return (
    <div className="story-container p-6 bg-gray-700 bg-opacity-70 rounded-xl shadow-inner">
      <h2 className="text-3xl font-semibold text-purple-400 mb-4">{title}</h2>
      <p className="text-white text-lg">{content}</p>
    </div>
  );
};

export default Story;
