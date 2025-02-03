import React, { useState } from 'react';
import supabase from '../services/supabase'; // Oletetaan, että Supabase on konfiguroitu

const RegistrationForm = () => {
  const [gameTag, setGameTag] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]); // Talletetaan valitut päivät
  const [bringingPC, setBringingPC] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const availableDays = ['2025-04-17', '2025-04-18', '2025-04-19', '2025-04-20', '2025-04-21'];

  const handleDayChange = (day: string) => {
    setSelectedDays(prevDays =>
      prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gameTag || selectedDays.length === 0) {
      setError('Pelitunnus ja vähintään yksi saapumispäivämäärä ovat pakollisia!');
      return;
    }

    try {
      // Lajitellaan päivämäärät ennen tallennusta
      const sortedDays = [...selectedDays].sort();

      const { error } = await supabase
        .from('registrations')
        .insert([
          { game_tag: gameTag, selected_days: sortedDays, bringing_pc: bringingPC }
        ]);

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
            onChange={() => setBringingPC(prevState => !prevState)}
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
    </div>
  );
};

export default RegistrationForm;
