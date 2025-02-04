import React, { useState } from 'react';
import Story1 from './components/Story1';
import Story2 from './components/Story2';
import Story3 from './components/Story3';
import Story4 from './components/Story4';

const Lore = () => {
  const [selectedStory, setSelectedStory] = useState('story1');

  const handleStoryChange = (story: string) => {
    setSelectedStory(story);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black p-6">
      <div className="text-white text-center p-8 max-w-4xl bg-gray-800 bg-opacity-80 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-8 text-purple-400 animate-pulse">
          Malmilta kuultuja tarinoita: Seikkailu Kuningattaren Varjossa
        </h1>

        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {[ 
            { key: 'story1', label: 'Malmin Kuningatar Ep.1' },
            { key: 'story2', label: 'Malmin Taistelu Ep.2' },
            { key: 'story3', label: 'Ystävyyden Voima Ep.3' },
            { key: 'story4', label: 'Varjokuningas Ep.4' }
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`px-4 py-2 rounded-xl transition-transform transform hover:scale-105 shadow-lg ${
                selectedStory === key
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-500 text-gray-200 hover:bg-purple-700'
              }`}
              onClick={() => handleStoryChange(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="p-6 bg-gray-700 bg-opacity-70 rounded-xl shadow-inner">
          {selectedStory === 'story1' && <Story1 />}
          {selectedStory === 'story2' && <Story2 />}
          {selectedStory === 'story3' && <Story3 />}
          {selectedStory === 'story4' && <Story4 />}
        </div>
      </div>
    </div>
  );
};

export default Lore;
