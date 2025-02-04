import React, { useState, useRef } from 'react';
import Story from '../components/Story'; // Assuming you have a Story component

const Lore = () => {
  const [selectedStory, setSelectedStory] = useState('story1');
  const audioRefs = {
    story1: useRef<HTMLAudioElement>(null),
    story2: useRef<HTMLAudioElement>(null),
    story3: useRef<HTMLAudioElement>(null),
    story4: useRef<HTMLAudioElement>(null),
  };

  const handleStoryChange = (story: string) => {
    setSelectedStory(story);
    // Pause all audios when switching to a new story
    Object.values(audioRefs).forEach(ref => ref.current?.pause());
    // Reset the audio position to the start, ensuring that ref.current exists
    Object.values(audioRefs).forEach(ref => {
      if (ref.current) {
        ref.current.currentTime = 0;
      }
    });
  };

  const handlePlay = (story: string) => {
    audioRefs[story].current?.play();
  };

  const handlePause = (story: string) => {
    audioRefs[story].current?.pause();
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
            { key: 'story4', label: 'Varjokuningas Ep.4' },
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`px-4 py-2 rounded-xl transition-transform transform hover:scale-105 shadow-lg ${selectedStory === key ? 'bg-purple-600 text-white' : 'bg-purple-500 text-gray-200 hover:bg-purple-700'}`}
              onClick={() => handleStoryChange(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="p-6 bg-gray-700 bg-opacity-70 rounded-xl shadow-inner">
          {selectedStory === 'story1' && (
            <>
              <Story title="Malmin Kuningatar" content="..." />
              <div>
                <button onClick={() => handlePlay('story1')} className="bg-purple-500 text-white px-4 py-2 rounded-xl">Play</button>
                <button onClick={() => handlePause('story1')} className="bg-purple-500 text-white px-4 py-2 rounded-xl">Pause</button>
                <audio ref={audioRefs.story1} src="assets/background-music.mp3" />
              </div>
            </>
          )}

          {selectedStory === 'story2' && (
            <>
              <Story title="Malmin Taistelu" content="..." />
              <div>
                <button onClick={() => handlePlay('story2')} className="bg-purple-500 text-white px-4 py-2 rounded-xl">Play</button>
                <button onClick={() => handlePause('story2')} className="bg-purple-500 text-white px-4 py-2 rounded-xl">Pause</button>
                <audio ref={audioRefs.story2} src="path/to/story2.mp3" />
              </div>
            </>
          )}

          {selectedStory === 'story3' && (
            <>
              <Story title="Ystävyyden Voima" content="..." />
              <div>
                <button onClick={() => handlePlay('story3')} className="bg-purple-500 text-white px-4 py-2 rounded-xl">Play</button>
                <button onClick={() => handlePause('story3')} className="bg-purple-500 text-white px-4 py-2 rounded-xl">Pause</button>
                <audio ref={audioRefs.story3} src="path/to/story3.mp3" />
              </div>
            </>
          )}

          {selectedStory === 'story4' && (
            <>
              <Story title="Varjokuningas" content="..." />
              <div>
                <button onClick={() => handlePlay('story4')} className="bg-purple-500 text-white px-4 py-2 rounded-xl">Play</button>
                <button onClick={() => handlePause('story4')} className="bg-purple-500 text-white px-4 py-2 rounded-xl">Pause</button>
                <audio ref={audioRefs.story4} src="path/to/story4.mp3" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lore;
