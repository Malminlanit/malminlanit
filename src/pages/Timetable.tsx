import React, { useState, useEffect } from 'react';
import supabase from '../services/supabase';  // Tuodaan supabase.js

function Schedule() {
  const [scheduleData, setScheduleData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSchedule = async () => {
      try {
        // Kysely Supabaseen
        const { data, error } = await supabase
          .from('schedules')  // Taulu, johon haetaan dataa
          .select('*');  // Haetaan kaikki kentät

        if (error) {
          throw error;  // Jos virhe, heitetään virhe
        }

        // Jos data löytyy, tallennetaan se tilaan
        setScheduleData(data);
      } catch (error) {
        // Jos kyselyssä tapahtui virhe, asetetaan virhetilanne
        setError(error.message);
        console.error('Virhe Supabase-yhteydessä:', error);
      }
    };

    getSchedule();  // Suoritetaan kysely heti, kun komponentti ladataan
  }, []);  // Tyhjä riippuvuuslista, joten kysely ajetaan vain kerran

  return (
    <div>
      <h1>Aikataulu</h1>

      {error && <p className="text-red-500">{`Virhe: ${error}`}</p>}  {/* Virhetilanne */}

      {scheduleData ? (
        <div>
          <h2>Haettu Aikataulu</h2>
          <pre>{JSON.stringify(scheduleData, null, 2)}</pre>  {/* Näytetään haettu data */}
        </div>
      ) : (
        <p>Ladataan aikataulua..</p>  {/* Näytetään latausviesti */}
      )}
    </div>
  );
}

export default Schedule;
