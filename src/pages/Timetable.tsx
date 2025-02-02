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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const correctPassword = "salasana123"; // Aseta oma salasana tähän

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsLoggedIn(true);
    } else {
      alert("Väärä salasana!");
    }
  };

  const times = ["09:00", "10:00", "12:00", "13:00", "16:00", "18:00", "20:00"];

  return (
    <div className="schedule-container">
      {!isLoggedIn ? (
        <div className="flex flex-col items-center mt-10">
          <h2 className="text-2xl mb-4">Kirjaudu muokataksesi aikataulua</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Salasana"
            className="border p-2 rounded mb-2"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Kirjaudu
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl text-center mb-6">Aikataulu: 17.-21.4.2025</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-500">
              <thead>
                <tr>
                  <th className="border border-gray-400 px-4 py-2">Aika</th>
                  {Object.keys(scheduleData).map((date) => (
                    <th key={date} className="border border-gray-400 px-4 py-2">{date}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {times.map((time) => (
                  <tr key={time}>
                    <td className="border border-gray-400 px-4 py-2">{time}</td>
                    {Object.keys(scheduleData).map((date) => {
                      const event = scheduleData[date].find((e) => e.time === time);
                      return (
                        <td key={date} className="border border-gray-400 px-4 py-2 text-center">
                          {event ? event.event : "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Schedule;
