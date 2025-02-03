import React, { useState, useEffect } from 'react';
import supabase from '../services/supabase';

interface BouncingTag {
  id: number;
  game_tag: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
}

const getRandomColor = () => {
  const colors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#845EC2', '#FF9671'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const RegistrationForm = () => {
  const [gameTag, setGameTag] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [bringingPC, setBringingPC] = useState(false);
  const [bouncingTags, setBouncingTags] = useState<BouncingTag[]>([]);

  const availableDays = ['2025-04-17', '2025-04-18', '2025-04-19', '2025-04-20', '2025-04-21'];

  useEffect(() => {
    const fetchRegistrations = async () => {
      const { data, error } = await supabase.from('registrations').select('id, game_tag');
      if (error) console.error('Virhe haettaessa rekisteröitymisiä:', error);
      else {
        const tags = data.map((item: any) => ({
          id: item.id,
          game_tag: item.game_tag,
          x: Math.random() * 300,
          y: Math.random() * 300,
          dx: (Math.random() > 0.5 ? 1 : -1) * (1 + Math.random() * 2),
          dy: (Math.random() > 0.5 ? 1 : -1) * (1 + Math.random() * 2),
          color: getRandomColor(),
        }));
        setBouncingTags(tags);
      }
    };

    fetchRegistrations();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBouncingTags((prevTags) =>
        prevTags.map((tag) => {
          let newX = tag.x + tag.dx;
          let newY = tag.y + tag.dy;

          if (newX <= 0 || newX >= 360) tag.dx *= -1;
          if (newY <= 0 || newY >= 360) tag.dy *= -1;

          return {
            ...tag,
            x: newX <= 0 || newX >= 360 ? tag.x + tag.dx : newX,
            y: newY <= 0 || newY >= 360 ? tag.y + tag.dy : newY,
          };
        })
      );
    }, 16); // 60 FPS

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameTag || selectedDays.length === 0) return;

    const sortedDays = [...selectedDays].sort();
    const { error } = await supabase
      .from('registrations')
      .insert([{ game_tag: gameTag, selected_days: sortedDays, bringing_pc: bringingPC }]);

    if (!error) {
      setGameTag('');
      setSelectedDays([]);
      setBringingPC(false);
    }
  };

  return (
    <div className="p-6 text-white max-w-lg mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-4 text-indigo-300 drop-shadow-lg">Ilmoittautuminen Lan-tapahtumaan</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-indigo-800 p-4 rounded-xl shadow-md">
        <input
          type="text"
          value={gameTag}
          onChange={(e) => setGameTag(e.target.value)}
          placeholder="Pelitunnus"
          className="w-full p-2 rounded-md bg-white text-black shadow-inner"
          required
        />

        <div>
          {availableDays.map((day) => (
            <label key={day} className="block text-sm">
              <input
                type="checkbox"
                checked={selectedDays.includes(day)}
                onChange={() =>
                  setSelectedDays((prev) =>
                    prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
                  )
                }
                className="mr-2"
              />
              {day}
            </label>
          ))}
        </div>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={bringingPC}
            onChange={() => setBringingPC((prev) => !prev)}
            className="mr-2"
          />
          Tuon oman koneen
        </label>

        <button type="submit" className="w-full bg-indigo-600 py-2 rounded-lg hover:bg-indigo-700 transition">Ilmoittaudu</button>
      </form>

      <div className="mt-10">
        <h3 className="text-2xl font-bold text-center mb-3 text-teal-400 drop-shadow-md">🎮 Jo rekisteröityneet 🎮</h3>
        <div className="relative w-96 h-96 border-4 border-teal-500 mx-auto rounded-xl overflow-hidden bg-gray-900 shadow-lg">
          {bouncingTags.map((tag) => (
            <div
              key={tag.id}
              className="absolute text-white font-bold text-sm px-3 py-2 rounded-full shadow-md"
              style={{
                left: tag.x,
                top: tag.y,
                backgroundColor: tag.color,
                boxShadow: `0 0 10px ${tag.color}`,
                transition: 'transform 0.1s',
              }}
            >
              {tag.game_tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
