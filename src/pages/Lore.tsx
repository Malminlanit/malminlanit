import React, { useState, useEffect } from 'react';
import Story from '../components/Story'; // Assuming you have a Story component

const Lore = () => {
  const [selectedStory, setSelectedStory] = useState('story1');
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Valitse oikea audio lähde sen mukaan, mikä tarina on valittu
    let newAudio: HTMLAudioElement | null = null;

    if (selectedStory === 'story1') {
      newAudio = new Audio('/src/assets/background-music.mp3'); // Korvattu polku
    } else if (selectedStory === 'story2') {
      newAudio = new Audio('/src/assets/story2.mp3'); // Korvattu polku
    } else if (selectedStory === 'story3') {
      newAudio = new Audio('/src/assets/story3.mp3'); // Korvattu polku
    } else if (selectedStory === 'story4') {
      newAudio = new Audio('/src/assets/story4.mp3'); // Korvattu polku
    }

    // Pysäytä aiempi ääni ennen uuden käynnistämistä
    if (audio) {
      audio.pause();
    }

    // Aseta uusi audio ja toista se
    setAudio(newAudio);

    return () => {
      if (newAudio) {
        newAudio.pause();
      }
    };
  }, [selectedStory]);

  const handlePlay = () => {
    audio?.play();
  };

  const handlePause = () => {
    audio?.pause();
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
              onClick={() => setSelectedStory(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="p-6 bg-gray-700 bg-opacity-70 rounded-xl shadow-inner">
          {selectedStory === 'story1' && (
            <>
              <Story title="Malmin Kuningatar" content="..." />
            </>
          )}

          {selectedStory === 'story2' && (
            <>
              <Story title="Malmin Taistelu" content="..." />
            </>
          )}

          {selectedStory === 'story3' && (
            <>
              <Story titl
