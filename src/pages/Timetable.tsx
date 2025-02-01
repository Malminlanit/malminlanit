import React from 'react';

const scheduleData = [
  { time: "09:00", event: "Tervetuloa ja rekisteröityminen" },
  { time: "10:00", event: "Pelit alkavat" },
  { time: "12:00", event: "Lounastauko" },
  { time: "13:00", event: "Kilpailut jatkuvat" },
  { time: "16:00", event: "Välitauko" },
  { time: "18:00", event: "Illallinen" },
  { time: "20:00", event: "Yöpelit ja rentoutuminen" },
  { time: "23:00", event: "Tapahtuma päättyy" },
];

function Schedule() {
  return (
    <div className="schedule-container">
      <h2 className="text-3xl text-center mb-6">Aikataulu</h2>
      <table className="w-full table-auto border-collapse border border-gray-500">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Aika</th>
            <th className="border border-gray-400 px-4 py-2">Tapahtuma</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">{item.time}</td>
              <td className="border border-gray-400 px-4 py-2">{item.event}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;
