import React, { useState } from 'react';

const scheduleData = {
  "17.4.2025": [
    { time: "09:00", event: "Tervetuloa ja rekisteröityminen" },
    { time: "10:00", event: "Pelit alkavat" },
    { time: "12:00", event: "Lounastauko" },
    { time: "13:00", event: "Kilpailut jatkuvat" },
    { time: "16:00", event: "Välitauko" },
    { time: "18:00", event: "Illallinen" },
    { time: "20:00", event: "Yöpelit ja rentoutuminen" },
  ],
  "18.4.2025": [
    { time: "09:00", event: "Pelit jatkuvat" },
    { time: "12:00", event: "Lounastauko" },
    { time: "13:00", event: "Kilpailut jatkuvat" },
    { time: "16:00", event: "Välitauko" },
    { time: "18:00", event: "Illallinen" },
    { time: "20:00", event: "Yöpelit ja rentoutuminen" },
  ],
  "19.4.2025": [
    { time: "09:00", event: "Pelit jatkuvat" },
    { time: "12:00", event: "Lounastauko" },
    { time: "13:00", event: "Kilpailut jatkuvat" },
    { time: "16:00", event: "Välitauko" },
    { time: "18:00", event: "Illallinen" },
    { time: "20:00", event: "Yöpelit ja rentoutuminen" },
  ],
  "20.4.2025": [
    { time: "09:00", event: "Pelit jatkuvat" },
    { time: "12:00", event: "Lounastauko" },
    { time: "13:00", event: "Kilpailut jatkuvat" },
    { time: "16:00", event: "Välitauko" },
    { time: "18:00", event: "Illallinen" },
    { time: "20:00", event: "Yöpelit ja rentoutuminen" },
  ],
  "21.4.2025": [
    { time: "09:00", event: "Pelit jatkuvat" },
    { time: "12:00", event: "Lounastauko" },
    { time: "13:00", event: "Kilpailut jatkuvat" },
    { time: "16:00", event: "Välitauko" },
    { time: "18:00", event: "Illallinen ja päättäjäiset" },
  ]
};

function Schedule() {
  const times = ["09:00", "10:00", "12:00", "13:00", "16:00", "18:00", "20:00"];
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('');
  const correctPassword = 'salasana123';

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsEditing(true);
    } else {
      alert('Väärä salasana');
    }
  };

  const handleEventChange = (date, time, newEvent) => {
    scheduleData[date] = scheduleData[date].map(event => 
      event.time === time ? { ...event, event: newEvent } : event
    );
  };

  return (
    <div className="schedule-container p-4">
      <h2 className="text-3xl text-center mb-6">Aikataulu: 17.-21.4.2025</h2>

      {!isEditing && (
        <div className="text-center mb-4">
          <input 
            type="password" 
            placeholder="Syötä salasana muokataksesi" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 px-3 py-2 mr-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleLogin} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Kirjaudu
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2 bg-gray-100">Aika</th>
              {Object.keys(scheduleData).map((date) => (
                <th key={date} className="border border-gray-400 px-4 py-2 bg-gray-100">{date}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time}>
                <td className="border border-gray-400 px-4 py-2 bg-gray-50 font-semibold">{time}</td>
                {Object.keys(scheduleData).map((date) => {
                  const event = scheduleData[date].find((e) => e.time === time);
                  return (
                    <td key={date} className="border border-gray-400 px-4 py-2 text-center bg-white">
                      {isEditing ? (
                        <input 
                          type="text" 
                          value={event ? event.event : ''}
                          onChange={(e) => handleEventChange(date, time, e.target.value)}
                          className="border border-gray-400 px-2 py-1 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        event ? event.event : "-"
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Schedule;
