import React, { useState, useRef } from 'react';
import Story from '../components/Story'; // Varmista, että Story-komponentti on oikein tuotu
import background from '../assets/background-music.mp3'; // Taustamusiikki

const Lore = () => {
  const [selectedStory, setSelectedStory] = useState('story1');
  
  // Viittaukset eri tarinoiden ääniin
  const audioRefs = {
    story1: useRef<HTMLAudioElement>(null),
    story2: useRef<HTMLAudioElement>(null),
    story3: useRef<HTMLAudioElement>(null),
    story4: useRef<HTMLAudioElement>(null),
    background: useRef<HTMLAudioElement>(null), // Taustamusiikin viite
  };

  // Muutetaan tarinaa ja pysäytetään kaikki äänet
  const handleStoryChange = (story: string) => {
    console.log(`Changing to story: ${story}`);
    setSelectedStory(story);
    // Tauotetaan kaikki äänet
    Object.values(audioRefs).forEach(ref => ref.current?.pause());
    // Palautetaan äänien aikaraja alkuun
    Object.values(audioRefs).forEach(ref => {
      if (ref.current) {
        ref.current.currentTime = 0;
      }
    });
  };

  // Toistetaan valittu tarina
  const handlePlay = (story: string) => {
    console.log(`Playing ${story}`);
    audioRefs[story].current?.play();
  };

  // Tauotetaan valittu tarina
  const handlePause = (story: string) => {
    console.log(`Pausing ${story}`);
    audioRefs[story].current?.pause();
  };

  // Toistetaan taustamusiikki
  const handlePlayBackground = () => {
    console.log('Playing background music');
    audioRefs.background.current?.play();
  };

  // Tauotetaan taustamusiikki
  const handlePauseBackground = () => {
    console.log('Pausing background music');
    audioRefs.background.current?.pause();
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
              <Story title="Malmin Kuningatar" content="Tarina alkaa..." />
              <div>
                <button onClick={() => handlePlay('story1')} className="bg-purple-500 text-white px-4 py-2 rounded-xl">Play</button>
                <button onClick={() => handlePause('story1')} className="bg-purple-500 text-white px-4 py-2 rounded-xl">Pause</button>
                <audio ref={audioRefs.story1} src="/assets/story1.mp3" />
              </div>
            </>
          )}

          {selectedStory === 'story2' && (
            <>
              <Story title="Malmin Taistelu" content="Seuraava osa..." />
              <div>
                <button onClick={() => handlePlay('story2')} className="bg-purple-500 text-white px-4 py-2 rounded-xl">Play</button>
                <button onClick={() => handlePause('story2')} className="bg-purple-500 text-white px-4 py-2 rounded-xl">Pause</button>
                <audio ref={audioRefs.story2} src="/assets/story2.mp3" />
              </div>
            </>
          )}

          {selectedStory === 'story3' && (
            <>
              <Story title="Ystävyyden Voima" content="Tarina Ystävyydestä..." />
              <div>
                <button onClick={() => handlePlay('story3')} className="bg-purple-500 text-white px-4 py-2 rounded-xl">Play</button>
                <button onClick={() => handlePause('story3')} className="bg-purple-500 text-white px-4 py-2 rounded-xl">Pause</button>
                <audio ref={audioRefs.story3} src="/assets/story3.mp3" />
              </div>
            </>
          )}

          {selectedStory === 'story4' && (
            <>
              <Story title="Varjokuningas" content="Lopullinen osa..." />
              <div>
                <button onClick={() => handlePlay('story4')} className="bg-purple-500 text-white px-4 py-2 rounded-xl">Play</button>
                <button onClick={() => handlePause('story4')} className="bg-purple-500 text-white px-4 py-2 rounded-xl">Pause</button>
                <audio ref={audioRefs.story4} src="/assets/story4.mp3" />
              </div>
            </>
          )}
        </div>

        {/* Taustamusiikin ohjaus */}
        <div className="mt-6">
          <button onClick={handlePlayBackground} className="bg-purple-500 text-white px-4 py-2 rounded-xl">Play Background Music</button>
          <button onClick={handlePauseBackground} className="bg-purple-500 text-white px-4 py-2 rounded-xl">Pause Background Music</button>
          <audio ref={audioRefs.background} src={background} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Lore;
