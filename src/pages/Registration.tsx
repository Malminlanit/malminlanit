import React, { useState } from 'react';
import supabase from '../services/supabase'; // Oletetaan, että Supabase on konfiguroitu

const RegistrationForm = () => {
  const [gameTag, setGameTag] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [bringingPC, setBringingPC] = useState(false); // Uusi tila koneen mukanaololle
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Yksinkertainen validointi
    if (!gameTag || !arrivalTime) {
      setError('Pelitunnus ja saapumisaika ovat pakollisia!');
      return;
    }

    try {
      const { error } = await supabase
        .from('registrations') // Oletetaan, että taulun nimi on 'registrations'
        .insert([
          { game_tag: gameTag, arrival_time: arrivalTime, bringing_pc: bringingPC } // Tallennetaan myös 'bringingPC'
        ]);

      if (error) throw error;

      // Ilmoittautuminen onnistui
      setSuccess(true);
      setGameTag('');
      setArrivalTime('');
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
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>
        
        <div>
          <label htmlFor="arrivalTime" className="block text-lg">Saapumisaika</label>
          <input
            type="time"
            id="arrivalTime"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
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
