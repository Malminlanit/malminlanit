import React, { useState, useEffect } from 'react';
import supabase from '../services/supabase';

function Schedule() {
  const [scheduleData, setScheduleData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSchedule = async () => {
      try {
        const { data, error } = await supabase
          .from('schedules')
          .select('*');

        if (error) {
          throw error;
        }

        setScheduleData(data);
      } catch (error) {
        setError(error.message);
        console.error('Virhe Supabase-yhteydessä:', error);
      }
    };

    getSchedule();
  }, []);

  return (
    <div>
      <h1>Aikataulu</h1>

      {error && <p className="text-red-500">{`Virhe: ${error}`}</p>}

      {scheduleData ? (
        <div>
          <h2>Haettu Aikataulu</h2>
          <pre>{JSON.stringify(scheduleData, null, 2)}</pre>
        </div>
      ) : (
        <p>Ladataan aikataulua...</p>
      )}
    </div>
  );
}

export default Schedule;
