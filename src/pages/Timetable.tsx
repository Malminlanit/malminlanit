import React, { useState } from 'react';

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
  const correctPassword = 'salasana123';

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsEditing(true);
    } else {
      alert('Väärä salasana');
    }
  };

  const handleEventChange = (date, index, key, value) => {
    setScheduleData(prevData => ({
      ...prevData,
      [date]: prevData[date].map((event, i) => 
        i === index ? { ...event, [key]: value } : event
      )
    }));
  };

  const handleAddRow = (date) => {
    setScheduleData(prevData => ({
      ...prevData,
      [date]: [...prevData[date], { time: "", event: "" }]
    }));
  };

  const handleSave = () => {
    alert('Muutokset tallennettu!');
    setIsEditing(false);
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

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2 bg-gray-100">Aika</th>
              {Object.keys(scheduleData).map((date) => (
                <th key={date} className="border border-gray-400 px-4 py-2 bg-gray-100">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={date}
                      onChange={(e) => {
                        const newDate = e.target.value;
                        setScheduleData(prev => {
                          const updated = { ...prev };
                          updated[newDate] = updated[date];
                          delete updated[date];
                          return updated;
                        });
                      }}
                      className="border border-gray-400 px-2 py-1 w-full rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    date
                  )}
                  {isEditing && (
                    <button onClick={() => handleAddRow(date)} className="ml-2 text-sm text-blue-500">+ Lisää rivi</button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(scheduleData).map((date) => (
              scheduleData[date].map((event, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2 bg-gray-50 font-semibold">
                    {isEditing ? (
                      <input
                        type="text"
                        value={event.time}
                        onChange={(e) => handleEventChange(date, index, 'time', e.target.value)}
                        className="border border-gray-400 px-2 py-1 w-full rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      event.time
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
                      event.event || "-"
                    )}
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>

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
