import React, { useState, useEffect } from 'react'; 
import supabase from '../services/supabase.js'; 

const initialMatchData = {
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
};

function TournamentBracket() {
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('');
  const [matchData, setMatchData] = useState(initialMatchData);
  const [newDay, setNewDay] = useState('');
  const [playerScores, setPlayerScores] = useState({});

  useEffect(() => {
    const getMatchData = async () => {
      const { data, error } = await supabase
        .from('matches')
        .select('match_data')
        .single();

      if (data) {
        setMatchData(data.match_data);
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

  const updatePlayerScores = (teamA, teamB, scoreA, scoreB) => {
    const updatedScores = { ...playerScores };

    // Lisää tai päivitä pelaajien pisteet
    [...teamA, ...teamB].forEach(player => {
      if (!updatedScores[player]) {
        updatedScores[player] = 0; // Aseta pelaajan pisteet nollaksi, jos ei ole
      }
    });

    // Päivitä pisteet
    teamA.forEach(player => {
      updatedScores[player] += scoreA;
    });
    teamB.forEach(player => {
      updatedScores[player] += scoreB;
    });

    setPlayerScores(updatedScores);
  };

  const handleScoreChange = (date, index, field, value) => {
    if (!isEditing) return;

    setMatchData(prevData => {
      const updatedData = {
        ...prevData,
        [date]: prevData[date].map((match, i) =>
          i === index ? { ...match, [field]: value } : match
        )
      };

      const saveToSupabase = async () => {
        const { error } = await supabase
          .from('matches')
          .upsert({ id: 1, match_data: updatedData });
        if (error) {
          console.error('Virhe turnauksen tietojen tallentamisessa:', error);
        }
      };
      saveToSupabase();

      const match = updatedData[date][index];
      if (field === 'scoreA' || field === 'scoreB') {
        updatePlayerScores(match.teamA, match.teamB, match.scoreA, match.scoreB);
      }

      return updatedData;
    });
  };

  const handleTeamChange = (date, index, team, playerIndex, value) => {
    if (!isEditing) return;

    setMatchData(prevData => {
      const updatedData = {
        ...prevData,
        [date]: prevData[date].map((match, i) =>
          i === index
            ? {
                ...match,
                [team]: match[team].map((player, j) =>
                  j === playerIndex ? value : player
                ),
              }
            : match
        ),
      };

      const saveToSupabase = async () => {
        const { error } = await supabase
          .from('matches')
          .upsert({ id: 1, match_data: updatedData });
        if (error) {
          console.error('Virhe turnauksen tietojen tallentamisessa:', error);
        }
      };
      saveToSupabase();
      return updatedData;
    });
  };

  const handleAddPlayer = (date, index, team) => {
    if (!isEditing) return;

    setMatchData(prevData => {
      const updatedData = {
        ...prevData,
        [date]: prevData[date].map((match, i) =>
          i === index
            ? {
                ...match,
                [team]: [...match[team], ""], // Lisää tyhjä kenttä joukkueen pelaajalle
              }
            : match
        ),
      };

      const saveToSupabase = async () => {
        const { error } = await supabase
          .from('matches')
          .upsert({ id: 1, match_data: updatedData });
        if (error) {
          console.error('Virhe turnauksen tietojen tallentamisessa:', error);
        }
      };
      saveToSupabase();
      return updatedData;
    });
  };

  const handleAddMatch = (date) => {
    if (!isEditing) return;

    setMatchData(prevData => {
      const updatedData = { ...prevData };
      if (!updatedData[date]) {
        updatedData[date] = [];
      }
      updatedData[date].push({
        time: "",
        match: "Joukkue A vs Joukkue B",
        teamA: ["", "", "", "", ""],  // Tyhjät pelaajat
        teamB: ["", "", "", "", ""],  // Tyhjät pelaajat
        scoreA: 0,
        scoreB: 0,
      });

      const saveToSupabase = async () => {
        const { error } = await supabase
          .from('matches')
          .upsert({ id: 1, match_data: updatedData });
        if (error) {
          console.error('Virhe turnauksen tietojen tallentamisessa:', error);
        }
      };
      saveToSupabase();
      return updatedData;
    });
  };

  const handleDeleteMatch = (date, index) => {
    if (!isEditing) return;

    setMatchData(prevData => {
      const updatedData = { ...prevData };
      updatedData[date].splice(index, 1);

      const saveToSupabase = async () => {
        const { error } = await supabase
          .from('matches')
          .upsert({ id: 1, match_data: updatedData });
        if (error) {
          console.error('Virhe turnauksen tietojen tallentamisessa:', error);
        }
      };
      saveToSupabase();
      return updatedData;
    });
  };

  const handleSave = async () => {
    if (!isEditing) return;

    const { error } = await supabase
      .from('matches')
      .upsert({ id: 1, match_data: matchData });

    if (error) {
      console.error('Virhe turnauksen tietojen tallentamisessa:', error);
    } else {
      alert('Turnauksen tiedot tallennettu Supabaseen!');
    }

    setIsEditing(false);
  };

  return (
    <div className="bracket-container min-h-screen bg-gradient-to-br from-indigo-900 via-teal-900 to-indigo-900 text-white p-6">
      <h2 className="text-4xl font-bold text-center mb-6">Turnaukset</h2>

      {/* Salasana ja muokkausnäkymä */}
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

      {/* Yhteenveto pelaajien pisteistä */}
      <div>
        <h3 className="text-2xl font-bold text-center mb-6">Pelaajien pisteet</h3>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Pelaaja</th>
              <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Pisteet</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(playerScores).map((player, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2 bg-white text-black">{player}</td>
                <td className="border border-gray-400 px-4 py-2 bg-white text-black">{playerScores[player]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ottelut */}
      {Object.keys(matchData).map((date) => (
        <div key={date} className="overflow-x-auto mb-6 bg-white/20 backdrop-blur-lg rounded-xl">
          <h3 className="text-xl text-center text-black font-bold mb-2">
            {date}
            {isEditing && (
              <button 
                onClick={() => handleDeleteDay(date)}
                className="text-sm text-red-500 ml-4"
              >
                Poista turnaus
              </button>
            )}
          </h3>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Aika</th>
                <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Ottelu</th>
                <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Pisteet</th>
                {isEditing && (
                  <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Toiminnot</th>
                )}
              </tr>
            </thead>
            <tbody>
              {matchData[date].map((match, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2 bg-white text-black">
                    <input 
                      type="time" 
                      value={match.time}
                      onChange={(e) => handleScoreChange(date, index, 'time', e.target.value)}
                      className={`w-20 bg-gray-200 rounded-md text-black ${!isEditing ? 'bg-gray-300' : ''}`}
                      disabled={!isEditing}
                    />
                  </td>
                  <td className="border border-gray-400 px-4 py-2 bg-white text-black">
                    <input 
                      type="text" 
                      value={match.match}
                      onChange={(e) => handleScoreChange(date, index, 'match', e.target.value)}
                      className={`w-full bg-gray-200 rounded-md text-black ${!isEditing ? 'bg-gray-300' : ''}`}
                      disabled={!isEditing}
                    />
                    <div className="text-sm text-gray-700">
                      <strong>Joukkue A:</strong> 
                      {isEditing && match.teamA.map((player, i) => (
                        <input
                          key={i}
                          type="text"
                          value={player}
                          onChange={(e) => handleTeamChange(date, index, 'teamA', i, e.target.value)}
                          className={`w-20 bg-gray-200 m-1 rounded-md text-black`}
                          disabled={!isEditing}
                        />
                      ))}
                      {isEditing && (
                        <button
                          onClick={() => handleAddPlayer(date, index, 'teamA')}
                          className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          Lisää pelaaja A
                        </button>
                      )}
                    </div>
                    <div className="text-sm text-gray-700">
                      <strong>Joukkue B:</strong>
                      {isEditing && match.teamB.map((player, i) => (
                        <input
                          key={i}
                          type="text"
                          value={player}
                          onChange={(e) => handleTeamChange(date, index, 'teamB', i, e.target.value)}
                          className={`w-20 bg-gray-200 m-1 rounded-md text-black`}
                          disabled={!isEditing}
                        />
                      ))}
                      {isEditing && (
                        <button
                          onClick={() => handleAddPlayer(date, index, 'teamB')}
                          className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          Lisää pelaaja B
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="border border-gray-400 px-4 py-2 bg-white text-black">
                    <input
                      type="number"
                      value={match.scoreA}
                      onChange={(e) => handleScoreChange(date, index, 'scoreA', parseInt(e.target.value))}
                      className={`w-12 bg-gray-200 rounded-md text-black`}
                      disabled={!isEditing}
                    />
                    -
                    <input
                      type="number"
                      value={match.scoreB}
                      onChange={(e) => handleScoreChange(date, index, 'scoreB', parseInt(e.target.value))}
                      className={`w-12 bg-gray-200 rounded-md text-black`}
                      disabled={!isEditing}
                    />
                  </td>
                  {isEditing && (
                    <td className="border border-gray-400 px-4 py-2 bg-white text-black">
                      <button
                        onClick={() => handleDeleteMatch(date, index)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Poista ottelu
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {isEditing && (
            <button 
              onClick={() => handleAddMatch(date)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg mt-4"
            >
              Lisää ottelu
            </button>
          )}
        </div>
      ))}

      {/* Tallenna painike */}
      {isEditing && (
        <div className="text-center mt-6">
          <button 
            onClick={handleSave} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Tallenna
          </button>
        </div>
      )}
    </div>
  );
}

export default TournamentBracket;
