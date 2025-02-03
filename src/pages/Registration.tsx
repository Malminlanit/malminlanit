import React, { useState, useEffect } from 'react';
import supabase from '../services/supabase';

interface BouncingTag {
  id: number;
  game_tag: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
}

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
          dx: Math.random() > 0.5 ? 2 : -2,
          dy: Math.random() > 0.5 ? 2 : -2,
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

          if (newX <= 0 || newX >= 350) tag.dx *= -1;
          if (newY <= 0 || newY >= 350) tag.dy *= -1;

          return {
            ...tag,
            x: newX <= 0 || newX >= 350 ? tag.x + tag.dx : newX,
            y: newY <= 0 || newY >= 350 ? tag.y + tag.dy : newY,
          };
        })
      );
    }, 20);

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
      <h2 className="text-4xl font-bold text-center mb-4">Ilmoittautuminen Lan-tapahtumaan</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={gameTag}
          onChange={(e) => setGameTag(e.target.value)}
          placeholder="Pelitunnus"
          className="w-full p-2 rounded-md bg-white text-black"
          required
        />

        <div>
          {availableDays.map((day) => (
            <label key={day} className="block">
              <input
                type="checkbox"
                checked={selectedDays.includes(day)}
                onChange={() =>
                  setSelectedDays((prev) =>
                    prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
                  )
                }
              />
              {day}
            </label>
          ))}
        </div>

        <label>
          <input
            type="checkbox"
            checked={bringingPC}
            onChange={() => setBringingPC((prev) => !prev)}
          />
          Kone mukana
        </label>

        <button type="submit" className="w-full bg-indigo-600 py-2 rounded-lg">Ilmoittaudu</button>
      </form>

      <div className="mt-10">
        <h3 className="text-2xl font-bold text-center mb-2">Jo rekisteröityneet</h3>
        <div className="relative w-80 h-80 border-2 border-white mx-auto overflow-hidden bg-black">
          {bouncingTags.map((tag) => (
            <div
              key={tag.id}
              className="absolute bg-indigo-500 text-white px-2 py-1 rounded"
              style={{ left: tag.x, top: tag.y }}
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
