import React from 'react';

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

  return (
    <div className="schedule-container">
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
  );
}

export default Schedule;
