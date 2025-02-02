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

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const REPO_OWNER = process.env.REACT_APP_GITHUB_USERNAME;
const REPO_NAME = process.env.REACT_APP_GITHUB_REPO;
const FILE_PATH = process.env.REACT_APP_FILE_PATH;

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
    setScheduleData(prevData => {
      const updatedData = {
        ...prevData,
        [date]: prevData[date].map((event, i) =>
          i === index ? { ...event, [key]: value } : event
        )
      };
      saveScheduleToGitHub(updatedData); // Päivitä tiedot GitHubiin
      return updatedData;
    });
  };

  const saveScheduleToGitHub = async (updatedData) => {
    const fileContent = JSON.stringify(updatedData, null, 2);
    const base64Content = window.btoa(unescape(encodeURIComponent(fileContent)));

    const sha = await getFileSha();

    try {
      const response = await fetch(
        `https://api.github.com/repos/Malminlanit/Malminlanit/src/public/schelude.json`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: 'Päivitetään aikataul',
            content: base64Content,
            sha: sha || undefined,
          })
        }
      );

      if (response.ok) {
        alert('Tiedot päivitetty GitHubiin!');
      } else {
        alert('Päivitys epäonnistui!');
      }
    } catch (error) {
      console.error('Virhe päivityksessä: ', error);
      alert('Päivitys epäonnistui!');
    }
  };

  const getFileSha = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/Malminlanit/Malminlanit/src/public/schelude.json`,
        {
          headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
          }
        }
      );
      const data = await response.json();

      if (data.message === "Not Found") {
        return null;
      }

      return data.sha;
    } catch (error) {
      console.error('Virhe tiedoston SHA:n hakemisessa:', error);
      return null;
    }
  };

  const handleAddRow = (date) => {
    setScheduleData(prevData => {
      const updatedData = { ...prevData };
      if (!updatedData[date]) {
        updatedData[date] = [];
      }
      updatedData[date].push({ time: "", event: "" });
      saveScheduleToGitHub(updatedData); // Päivitä tiedot GitHubiin
      return updatedData;
    });
  };

  const handleSave = () => {
    alert('Muutokset on tallennettu!');
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
