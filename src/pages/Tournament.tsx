import React, { useState, useEffect } from 'react';
import supabase from '../services/supabase.js';

const initialMatchData = {
  "Tappelupeli": {
    "Päivämäärä 1": [
      {
        time: "10:00",
        match: "Joukkue A vs Joukkue B",
        teamA: ["Pelaaja 1", "Pelaaja 2", "Pelaaja 3", "Pelaaja 4", "Pelaaja 5"],
        teamB: ["Pelaaja 6", "Pelaaja 7", "Pelaaja 8", "Pelaaja 9", "Pelaaja 10"],
        scoreA: 0,
        scoreB: 0
      }
    ]
  },
  "FPS": {
    "Päivämäärä 1": [
      {
        time: "12:00",
        match: "Joukkue A vs Joukkue B",
        teamA: ["Pelaaja 1", "Pelaaja 2", "Pelaaja 3", "Pelaaja 4", "Pelaaja 5"],
        teamB: ["Pelaaja 6", "Pelaaja 7", "Pelaaja 8", "Pelaaja 9", "Pelaaja 10"],
        scoreA: 0,
        scoreB: 0
      }
    ]
  },
  "MOBA": {
    "Päivämäärä 1": [
      {
        time: "14:00",
        match: "Joukkue A vs Joukkue B",
        teamA: ["Pelaaja 1", "Pelaaja 2", "Pelaaja 3", "Pelaaja 4", "Pelaaja 5"],
        teamB: ["Pelaaja 6", "Pelaaja 7", "Pelaaja 8", "Pelaaja 9", "Pelaaja 10"],
        scoreA: 0,
        scoreB: 0
      }
    ]
  }
};

function TournamentBracket() {
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedGameType, setSelectedGameType] = useState("Tappelupeli");
  const [matchData, setMatchData] = useState(initialMatchData);
  const [tempMatchData, setTempMatchData] = useState(initialMatchData);

  useEffect(() => {
    const getMatchData = async () => {
      const { data, error } = await supabase
        .from('matches')
        .select('match_data')
        .single();

      if (data) {
        setMatchData(data.match_data);
        setTempMatchData(data.match_data);
      } else {
        console.error('Virhe turnauksen tietojen hakemisessa:', error);
      }
    };

    getMatchData();
  }, []);

  const handleLogin = () => {
    if (password === 'salasana123') {
      setIsEditing(true);
    } else {
      alert('Väärä salasana');
    }
  };

  const handleScoreChange = (gameType, date, index, team, value) => {
    setTempMatchData(prevData => {
      const updatedData = {
        ...prevData,
        [gameType]: {
          ...prevData[gameType],
          [date]: prevData[gameType][date].map((match, i) =>
            i === index ? { ...match, [team]: value } : match
          )
        }
      };
      return updatedData;
    });
  };

  const handlePlayerChange = (gameType, date, matchIndex, teamIndex, playerIndex, value) => {
    setTempMatchData(prevData => {
      const updatedData = { ...prevData };
      updatedData[gameType][date][matchIndex][teamIndex][playerIndex] = value;
      return updatedData;
    });
  };

  const handleMatchTimeChange = (gameType, date, matchIndex, value) => {
    setTempMatchData(prevData => {
      const updatedData = { ...prevData };
      updatedData[gameType][date][matchIndex].time = value;
      return updatedData;
    });
  };

  const handleAddMatch = (gameType, date) => {
    setTempMatchData(prevData => {
      const updatedData = { ...prevData };
      if (!updatedData[gameType][date]) {
        updatedData[gameType][date] = [];
      }
      updatedData[gameType][date].push({
        time: "",
        match: "Joukkue A vs Joukkue B",
        teamA: ["", "", "", "", ""],
        teamB: ["", "", "", "", ""],
        scoreA: 0,
        scoreB: 0
      });
      return updatedData;
    });
  };

  const handleDeleteMatch = (gameType, date, index) => {
    setTempMatchData(prevData => {
      const updatedData = { ...prevData };
      updatedData[gameType][date].splice(index, 1);
      return updatedData;
    });
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from('matches')
      .upsert({ id: 1, match_data: tempMatchData });

    if (error) {
      console.error('Virhe turnauksen tietojen tallentamisessa:', error);
    } else {
      alert('Turnauksen tiedot tallennettu Supabaseen!');
      setMatchData(tempMatchData);
      setIsEditing(false);
    }
  };

  return (
    <div className="bracket-container min-h-screen bg-gradient-to-br from-indigo-900 via-teal-900 to-indigo-900 text-white p-6">
      <h2 className="text-4xl font-bold text-center mb-6">5v5 Turnauskaavio</h2>

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
          <label className="mr-4 text-black">Valitse peli:</label>
          <select
            value={selectedGameType}
            onChange={(e) => setSelectedGameType(e.target.value)}
            className="border border-gray-400 px-4 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="Tappelupeli">Tappelupeli</option>
            <option value="FPS">FPS</option>
            <option value="MOBA">MOBA</option>
          </select>
        </div>
      )}

      {Object.keys(tempMatchData[selectedGameType] || {}).map((date) => (
        <div key={date} className="overflow-x-auto mb-6 bg-white/20 backdrop-blur-lg rounded-xl">
          <h3 className="text-xl text-center text-black font-bold mb-2">
            {date}
          </h3>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Aika</th>
                <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Ottelu</th>
                <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Pisteet</th>
                <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Muokkaa</th>
              </tr>
            </thead>
            <tbody>
              {tempMatchData[selectedGameType][date].map((match, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-400 px-4 py-2 text-black">
                    {isEditing ? (
                      <input
                        type="time"
                        value={match.time}
                        onChange={(e) => handleMatchTimeChange(selectedGameType, date, index, e.target.value)}
                        className="border px-2 py-1 rounded-lg"
                      />
                    ) : (
                      match.time
                    )}
                  </td>
                  <td className="border border-gray-400 px-4 py-2 text-black">
                    <div>
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={match.teamA.join(", ")}
                            onChange={(e) => {
                              const players = e.target.value.split(", ");
                              players.forEach((player, playerIndex) => {
                                handlePlayerChange(selectedGameType, date, index, 'teamA', playerIndex, player);
                              });
                            }}
                            className="border px-2 py-1 rounded-lg"
                          />
                          {" vs "}
                          <input
                            type="text"
                            value={match.teamB.join(", ")}
                            onChange={(e) => {
                              const players = e.target.value.split(", ");
                              players.forEach((player, playerIndex) => {
                                handlePlayerChange(selectedGameType, date, index, 'teamB', playerIndex, player);
                              });
                            }}
                            className="border px-2 py-1 rounded-lg"
                          />
                        </>
                      ) : (
                        `${match.teamA.join(', ')} vs ${match.teamB.join(', ')}` 
                      )}
                    </div>
                  </td>
                  <td className="border border-gray-400 px-4 py-2 text-black">
                    {isEditing ? (
                      <div>
                        <input
                          type="number"
                          value={match.scoreA}
                          onChange={(e) => handleScoreChange(selectedGameType, date, index, 'scoreA', e.target.value)}
                          className="border px-2 py-1 rounded-lg"
                        />{" "}
                        -{" "}
                        <input
                          type="number"
                          value={match.scoreB}
                          onChange={(e) => handleScoreChange(selectedGameType, date, index, 'scoreB', e.target.value)}
                          className="border px-2 py-1 rounded-lg"
                        />
                      </div>
                    ) : (
                      `${match.scoreA} - ${match.scoreB}`
                    )}
                  </td>
                  <td className="border border-gray-400 px-4 py-2 text-black">
                    {isEditing && (
                      <>
                        <button
                          onClick={() => handleDeleteMatch(selectedGameType, date, index)}
                          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        >
                          Poista ottelu
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {isEditing && (
        <div className="text-center mt-6">
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            Hyväksy muutokset
          </button>
        </div>
      )}
    </div>
  );
}

export default TournamentBracket;
