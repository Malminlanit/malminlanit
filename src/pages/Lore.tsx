import React, { useState, useRef } from 'react';
import Story from '../components/Story';

const Lore = () => {
  const [selectedStory, setSelectedStory] = useState('story1');
  const audioRefs = useRef<any>({});

  const handleStoryChange = (story: string) => {
    setSelectedStory(story);
  };

  const handlePlayAudio = (storyKey: string) => {
    if (audioRefs.current[storyKey]) {
      audioRefs.current[storyKey].play();
    }
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
          {selectedStory === 'story1' && (
            <div>
              <Story
                title="Malmin Kuningatar"
                content="Tarina tästä tapahtuu täällä..."
              />
              <audio ref={(el) => (audioRefs.current['story1'] = el)} src="/path/to/story1.mp3" />
              <button
                className="px-4 py-2 mt-4 bg-purple-600 rounded-xl"
                onClick={() => handlePlayAudio('story1')}
              >
                Play Audio
              </button>
            </div>
          )}

          {selectedStory === 'story2' && (
            <div>
              <Story
                title="Malmin Taistelu"
                content="Tarina tästä tapahtuu täällä..."
              />
              <audio ref={(el) => (audioRefs.current['story2'] = el)} src="/path/to/story2.mp3" />
              <button
                className="px-4 py-2 mt-4 bg-purple-600 rounded-xl"
                onClick={() => handlePlayAudio('story2')}
              >
                Play Audio
              </button>
            </div>
          )}

          {selectedStory === 'story3' && (
            <div>
              <Story
                title="Ystävyyden Voima"
                content="Tarina tästä tapahtuu täällä..."
              />
              <audio ref={(el) => (audioRefs.current['story3'] = el)} src="/path/to/story3.mp3" />
              <button
                className="px-4 py-2 mt-4 bg-purple-600 rounded-xl"
                onClick={() => handlePlayAudio('story3')}
              >
                Play Audio
              </button>
            </div>
          )}

          {selectedStory === 'story4' && (
            <div>
              <Story
                title="Varjokuningas"
                content="Tarina tästä tapahtuu täällä..."
              />
              <audio ref={(el) => (audioRefs.current['story4'] = el)} src="/path/to/story4.mp3" />
              <button
                className="px-4 py-2 mt-4 bg-purple-600 rounded-xl"
                onClick={() => handlePlayAudio('story4')}
              >
                Play Audio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lore;
