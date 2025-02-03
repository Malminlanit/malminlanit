import React from 'react';

interface StoryProps {
  title: string;
  content: string;
}

const Story: React.FC<StoryProps> = ({ title, content }) => {
  return (
    <div className="story-container p-6 bg-gray-700 bg-opacity-70 rounded-xl shadow-inner">
      <h2 className="text-3xl font-semibold text-purple-400 mb-4">{title}</h2>
      {content.split('\n\n').map((paragraph, index) => (
        <p key={index} className="text-white text-lg mb-4">{paragraph}</p>
      ))}
    </div>
  );
};

export default Story;
