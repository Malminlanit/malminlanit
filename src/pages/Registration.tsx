import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import supabase from '../services/supabase'; // Oletetaan, että Supabase on konfiguroitu

const RegistrationForm = () => {
  const [gameTag, setGameTag] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [bringingPC, setBringingPC] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState<string[]>([]);

  const availableDays = ['2025-04-17', '2025-04-18', '2025-04-19', '2025-04-20', '2025-04-21'];

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('registrations').select('game_tag');
      if (error) console.error('Virhe ladattaessa käyttäjiä:', error);
      else setRegisteredUsers(data.map((entry) => entry.game_tag));
    };

    fetchUsers();
  }, [success]);

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
    } catch (error) {
      setError('Ilmoittautuminen epäonnistui. Yritä uudelleen!');
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-900 via-teal-900 to-indigo-900 text-white rounded-xl shadow-lg max-w-lg mx-auto">
      <h2 className="text-4xl font-bold text-center mb-4">Ilmoittautuminen Lan-tapahtumaan</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Ilmoittautuminen onnistui!</p>}

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
          <div className="space-y-2">
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
        </div>

        <div>
          <label htmlFor="bringingPC" className="block text-lg">Onko sinulla kone mukanasi?</label>
          <input
            type="checkbox"
            id="bringingPC"
            checked={bringingPC}
            onChange={() => setBringingPC((prevState) => !prevState)}
            className="w-4 h-4 mr-2"
          />
          <span className="text-white">Kyllä, tuon koneen.</span>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Ilmoittaudu
        </button>
      </form>

      {/* 🎯 Rekisteröityneiden laatikko */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-center mb-2">Jo rekisteröityneet</h3>
        <div className="relative h-40 overflow-hidden bg-black bg-opacity-20 rounded-lg border border-indigo-400 shadow-inner">
          {registeredUsers.map((user, index) => (
            <motion.div
              key={index}
              className="absolute bg-white text-black font-semibold px-3 py-1 rounded-full shadow-md"
              animate={{
                x: ['0%', '80%', '0%'], // Pomppii vasemmalta oikealle ja takaisin
                y: [0, 10, 0], // Kevyt pystysuuntainen pomppu
              }}
              transition={{
                duration: 4 + Math.random() * 2, // Satunnainen kesto
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
                delay: Math.random(), // Satunnainen viive
              }}
              style={{
                top: `${Math.random() * 80}%`, // Satunnainen pystysijainti
              }}
            >
              {user}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
