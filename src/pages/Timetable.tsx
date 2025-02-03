import React, { useState, useEffect } from 'react'; 
import supabase from '../services/supabase.js'; 

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
  const [newDay, setNewDay] = useState(''); 

  useEffect(() => {
    const getSchedule = async () => {
      const { data, error } = await supabase
        .from('schedules')
        .select('schedule')
        .single();

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

  const handleAddRow = (date) => {
    setScheduleData(prevData => {
      const updatedData = { ...prevData };
      if (!updatedData[date]) {
        updatedData[date] = [];
      }
      updatedData[date].push({ time: "", event: "" });

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

  const handleDeleteRow = (date, index) => {
    setScheduleData(prevData => {
      const updatedData = { ...prevData };
      updatedData[date].splice(index, 1); 

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
    if (!newDay) {
      alert('Syötä päivämäärä');
      return;
    }

    setScheduleData(prevData => {
      const updatedData = { ...prevData };
      if (!updatedData[newDay]) {
        updatedData[newDay] = [{ time: "", event: "" }];
      }

      const saveToSupabase = async () => {
        const { error } = await supabase
          .from('schedules')
          .upsert({ id: 1, schedule: updatedData });
        if (error) {
          console.error('Virhe aikataulun tallentamisessa:', error);
        }
      };
      saveToSupabase();
      setNewDay('');
      return updatedData;
    });
  };

  const handleDeleteDay = (date) => {
    setScheduleData(prevData => {
      const updatedData = { ...prevData };
      delete updatedData[date];

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
    <div className="schedule-container min-h-screen bg-gradient-to-br from-indigo-900 via-teal-900 to-indigo-900 text-white p-6">
      <h2 className="text-4xl font-bold text-center mb-6">Aikataulu</h2>

      {!isEditing && (
        <div className="text-center mb-4">
          <input 
            type="password" 
            placeholder="Syötä salasana muokataksesi" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 px-4 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button 
            onClick={handleLogin} 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg focus:outline-none"
          >
            Kirjaudu
          </button>
        </div>
      )}

      {isEditing && (
        <div className="text-center mb-4">
          <input 
            type="text" 
            placeholder="Syötä uusi päivämäärä"
            value={newDay}
            onChange={(e) => setNewDay(e.target.value)}
            className="border border-gray-400 px-4 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button 
            onClick={handleAddDay} 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg focus:outline-none"
          >
            Lisää uusi päivä
          </button>
        </div>
      )}

      {Object.keys(scheduleData).map((date) => (
        <div key={date} className="overflow-x-auto mb-6 bg-white/20 backdrop-blur-lg rounded-xl">
          <h3 className="text-xl text-center text-black font-bold mb-2">
            {date}
            {isEditing && (
              <button 
                onClick={() => handleDeleteDay(date)}
                className="text-sm text-red-500 ml-4"
              >
                Poista päivä
              </button>
            )}
          </h3>
          <table className="w-full table-auto border-collapse">
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
                  <td className="border border-gray-400 px-4 py-2 bg-white text-black">
                    {isEditing ? (
                      <input
                        type="text"
                        value={event.time}
                        onChange={(e) => handleEventChange(date, index, 'time', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-100 rounded-md"
                      />
                    ) : (
                      event.time
                    )}
                  </td>
                  <td className="border border-gray-400 px-4 py-2 bg-white text-black">
                    {isEditing ? (
                      <input
                        type="text"
                        value={event.event}
                        onChange={(e) => handleEventChange(date, index, 'event', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-100 rounded-md"
                      />
                    ) : (
                      event.event
                    )}
                  </td>
                  {isEditing && (
                    <td className="border border-gray-400 px-4 py-2 bg-white text-black">
                      <button 
                        onClick={() => handleDeleteRow(date, index)} 
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Poista
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {isEditing && (
            <button 
              onClick={() => handleAddRow(date)} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
            >
              Lisää rivi
            </button>
          )}
        </div>
      ))}

      {isEditing && (
        <div className="text-center mt-4">
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            Tallenna Aikataulu
          </button>
        </div>
      )}
    </div>
  );
}

export default Schedule;
