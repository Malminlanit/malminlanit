import React, { useState, useEffect } from 'react';
import supabase from '../services/supabase.js';  // Tuodaan supabase.js

const initialScheduleData = {
  "17.4.2025": [
    { time: "09:00", event: "Tervetuloa ja rekisteröityminen" },
    { time: "10:00", event: "Pelit alkavat" },
    { time: "12:00", event: "Lounastauko" },
    { time: "13:00", event: "Kilpailut jatkuvat" },
    { time: "16:00", event: "Välitauko" },
    { time: "18:00", event: "Illallinen" },
    { time: "20:00", event: "Yöpelit ja rentoutuminen" },
  ]
};

function Schedule() {
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('');
  const [scheduleData, setScheduleData] = useState(initialScheduleData);

  // Lataa aikataulu Supabasesta
  useEffect(() => {
    const getSchedule = async () => {
      const { data, error } = await supabase
        .from('schedules')
        .select('schedule')
        .single();  // Oletetaan, että aikataulu tallennetaan yksittäiseksi objektiksi

      if (data) {
        setScheduleData(data.schedule);
      } else {
        console.error('Virhe aikataulun hakemisessa:', error);
      }
    };

    getSchedule();
  }, []);

  const handleLogin = () => {
    if (password === 'salasana123') {
      setIsEditing(true);
    } else {
      alert('Väärä salasana');
    }
  };

  const handleEventChange = (date, index, key, value) => {
    setScheduleData(prevData => {
      const updatedData = {
        ...prevData,
        [date]: prevData[date].map((event, i) =>
          i === index ? { ...event, [key]: value } : event
        )
      };

      // Tallennetaan muutos Supabaseen reaaliaikaisesti
      const saveToSupabase = async () => {
        const { error } = await supabase
          .from('schedules')
          .upsert({ id: 1, schedule: updatedData }); // päivitetään aikataulu
        if (error) {
          console.error('Virhe aikataulun tallentamisessa:', error);
        }
      };
      saveToSupabase();
      return updatedData;
    });
  };

  const handleAddRow = (date) => {
    setScheduleData(prevData => {
      const updatedData = { ...prevData };
      if (!updatedData[date]) {
        updatedData[date] = [];
      }
      updatedData[date].push({ time: "", event: "" });

      // Tallennetaan muutos Supabaseen reaaliaikaisesti
      const saveToSupabase = async () => {
        const { error } = await supabase
          .from('schedules')
          .upsert({ id: 1, schedule: updatedData });
        if (error) {
          console.error('Virhe aikataulun tallentamisessa:', error);
        }
      };
      saveToSupabase();
      return updatedData;
    });
  };

  const handleAddDay = () => {
    const newDate = "18.4.2025"; // Voit muuttaa tämän dynaamiseksi (esim. päivämääräautomaatio)
    
    // Lisätään uusi päivä (taulukko)
    setScheduleData(prevData => {
      const updatedData = { ...prevData };
      if (!updatedData[newDate]) {
        updatedData[newDate] = []; // Tyhjä taulukko tälle päivälle
      }

      // Tallennetaan muutos Supabaseen reaaliaikaisesti
      const saveToSupabase = async () => {
        const { error } = await supabase
          .from('schedules')
          .upsert({ id: 1, schedule: updatedData });
        if (error) {
          console.error('Virhe aikataulun tallentamisessa:', error);
        }
      };
      saveToSupabase();
      return updatedData;
    });
  };

  const handleSave = async () => {
    // Tallennetaan aikataulu Supabaseen
    const { error } = await supabase
      .from('schedules')
      .upsert({ id: 1, schedule: scheduleData });

    if (error) {
      console.error('Virhe aikataulun tallentamisessa:', error);
    } else {
      alert('Aikataulu tallennettu Supabaseen!');
    }

    setIsEditing(false);
  };

  return (
    <div className="schedule-container p-4">
      <h2 className="text-3xl text-center mb-6">Aikataulu</h2>

      {!isEditing && (
        <div className="text-center mb-4">
          <input 
            type="password" 
            placeholder="Syötä salasana muokataksesi" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 px-3 py-2 mr-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleLogin} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Kirjaudu
          </button>
        </div>
      )}

      {/* Lisää uusi päivä */}
      {isEditing && (
        <div className="text-center mb-4">
          <button 
            onClick={handleAddDay} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Lisää uusi päivä
          </button>
        </div>
      )}

      {Object.keys(scheduleData).map((date) => (
        <div key={date} className="overflow-x-auto mb-6">
          <h3 className="text-xl text-center text-black font-bold mb-2">{date}</h3>
          <table className="w-full table-auto border-collapse border border-gray-500">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Aika</th>
                <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Tapahtuma</th>
                {isEditing && (
                  <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Toiminnot</th>
                )}
              </tr>
            </thead>
            <tbody>
              {scheduleData[date].map((event, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2 bg-gray-50">
                    {isEditing ? (
                      <input
                        type="text"
                        value={event.time}
                        onChange={(e) => handleEventChange(date, index, 'time', e.target.value)}
                        className="border border-gray-400 px-2 py-1 w-full rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="text-black">{event.time}</span>
                    )}
                  </td>
                  <td className="border border-gray-400 px-4 py-2 text-center bg-white">
                    {isEditing ? (
                      <input
                        type="text"
                        value={event.event}
                        onChange={(e) => handleEventChange(date, index, 'event', e.target.value)}
                        className="border border-gray-400 px-2 py-1 w-full rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="text-black">{event.event || "-"}</span>
                    )}
                  </td>
                  {isEditing && (
                    <td className="border border-gray-400 px-4 py-2 text-center bg-gray-50">
                      <button onClick={() => handleAddRow(date)} className="text-sm text-blue-500">+ Lisää rivi</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {isEditing && (
        <div className="text-center mt-4">
          <button 
            onClick={handleSave} 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Hyväksy muutokset
          </button>
        </div>
      )}
    </div>
  );
}

export default Schedule;
