import React, { useState, useEffect } from 'react';
import supabase from '../services/supabase';

const RegistrationForm = () => {
  const [gameTag, setGameTag] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [bringingPC, setBringingPC] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [registrations, setRegistrations] = useState<string[]>([]);

  const availableDays = ['2025-04-17', '2025-04-18', '2025-04-19', '2025-04-20', '2025-04-21'];

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    const { data, error } = await supabase.from('registrations').select('game_tag');
    if (data) setRegistrations(data.map((item) => item.game_tag));
    if (error) console.error('Virhe haettaessa ilmoittautumisia:', error);
  };

  const handleDayChange = (day: string) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameTag || selectedDays.length === 0) {
      setError('Pelitunnus ja vähintään yksi saapumispäivämäärä ovat pakollisia!');
      return;
    }

    try {
      const sortedDays = [...selectedDays].sort();
      const { error } = await supabase
        .from('registrations')
        .insert([{ game_tag: gameTag, selected_days: sortedDays, bringing_pc: bringingPC }]);

      if (error) throw error;

      setSuccess(true);
      setGameTag('');
      setSelectedDays([]);
      setBringingPC(false);
      fetchRegistrations();
    } catch (error) {
      setError('Ilmoittautuminen epäonnistui. Yritä uudelleen!');
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-900 via-teal-900 to-indigo-900 text-white rounded-xl shadow-lg max-w-lg mx-auto space-y-8">
      <h2 className="text-4xl font-bold text-center">Ilmoittautuminen Lan-tapahtumaan</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="gameTag" className="block text-lg">Pelitunnus</label>
          <input
            type="text"
            id="gameTag"
            value={gameTag}
            onChange={(e) => setGameTag(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>

        <div>
          <label className="block text-lg">Valitse saapumispäivämäärät</label>
          {availableDays.map((day) => (
            <div key={day} className="flex items-center">
              <input
                type="checkbox"
                id={day}
                checked={selectedDays.includes(day)}
                onChange={() => handleDayChange(day)}
                className="w-4 h-4 mr-2"
              />
              <label htmlFor={day} className="text-white">{day}</label>
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="bringingPC" className="block text-lg">Onko sinulla kone mukanasi?</label>
          <input
            type="checkbox"
            id="bringingPC"
            checked={bringingPC}
            onChange={() => setBringingPC((prev) => !prev)}
            className="w-4 h-4 mr-2"
          />
          <span>Kyllä, tuon koneen.</span>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Ilmoittaudu
        </button>
      </form>

      <div className="bg-black p-4 rounded-lg relative h-60 overflow-hidden border-2 border-indigo-500">
        <h3 className="text-xl text-center mb-2">Jo rekisteröityneet</h3>
        {registrations.map((tag, index) => (
          <div
            key={index}
            className="bouncing-tag absolute bg-indigo-400 text-black px-2 py-1 rounded shadow-md font-bold"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              animationDuration: `${3 + Math.random() * 2}s`,
              animationDirection: Math.random() > 0.5 ? 'normal' : 'reverse',
            }}
          >
            {tag}
          </div>
        ))}
      </div>

      <style>{`
        .bouncing-tag {
          animation: bounce 4s infinite alternate ease-in-out;
        }
        @keyframes bounce {
          from {
            transform: translate(0, 0);
          }
          to {
            transform: translate(100px, 100px);
          }
        }
      `}</style>
    </div>
  );
};

export default RegistrationForm;
