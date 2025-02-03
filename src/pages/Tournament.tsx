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
  const [gameType, setGameType] = useState('Tappelupeli');
  const [playerNames, setPlayerNames] = useState({});
  const [gameResults, setGameResults] = useState({
    "Tappelupeli": [],
    "FPS": [],
    "MOBA": []
  });

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

  const handleScoreChange = (date, index, team, value) => {
    setMatchData(prevData => {
      const updatedData = {
        ...prevData,
        [date]: prevData[date].map((match, i) =>
          i === index ? { ...match, [team]: value } : match
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
      return updatedData;
    });
  };

  const handlePlayerChange = (date, matchIndex, teamIndex, playerIndex, value) => {
    setMatchData(prevData => {
      const updatedData = { ...prevData };
      updatedData[date][matchIndex][teamIndex][playerIndex] = value;

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

  const handleAddPlayer = (date, matchIndex, teamIndex) => {
    setMatchData(prevData => {
      const updatedData = { ...prevData };
      updatedData[date][matchIndex][teamIndex].push(`Pelaaja ${updatedData[date][matchIndex][teamIndex].length + 1}`);
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

  const handleRemovePlayer = (date, matchIndex, teamIndex, playerIndex) => {
    setMatchData(prevData => {
      const updatedData = { ...prevData };
      updatedData[date][matchIndex][teamIndex].splice(playerIndex, 1);

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
        scoreB: 0
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

  const handleAddDay = () => {
    if (!newDay) {
      alert('Syötä päivämäärä');
      return;
    }

    setMatchData(prevData => {
      const updatedData = { ...prevData };
      if (!updatedData[newDay]) {
        updatedData[newDay] = [{ time: "", match: "", teamA: [], teamB: [], scoreA: 0, scoreB: 0 }];
      }

      const saveToSupabase = async () => {
        const { error } = await supabase
          .from('matches')
          .upsert({ id: 1, match_data: updatedData });
        if (error) {
          console.error('Virhe turnauksen tietojen tallentamisessa:', error);
        }
      };
      saveToSupabase();
      setNewDay('');
      return updatedData;
    });
  };

  const handleDeleteDay = (date) => {
    setMatchData(prevData => {
      const updatedData = { ...prevData };
      delete updatedData[date];

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

  const getMatchName = (gameType, teamA, teamB) => {
    if (gameType === 'Tappelupeli') {
      return `${teamA} vs ${teamB} - Tappelupeli`;
    }
    return `${teamA} vs ${teamB}`;
  };

  const handleGameResult = (gameType, match) => {
    const updatedResults = { ...gameResults };
    updatedResults[gameType].push({
      match: `${match.teamA.join(", ")} vs ${match.teamB.join(", ")}`,
      score: `${match.scoreA} - ${match.scoreB}`
    });
    setGameResults(updatedResults);
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
            value={gameType}
            onChange={(e) => setGameType(e.target.value)}
            className="border border-gray-400 px-4 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="Tappelupeli">Tappelupeli</option>
            <option value="FPS">FPS</option>
            <option value="MOBA">MOBA</option>
          </select>
        </div>
      )}

      {Object.keys(matchData).map((date) => (
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
                <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Ottelu</th>
                <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Pisteet</th>
                <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Muokkaa</th>
              </tr>
            </thead>
            <tbody>
              {matchData[date].map((match, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-400 px-4 py-2 text-black">{match.time}</td>
                  <td className="border border-gray-400 px-4 py-2 text-black">
                    {getMatchName(gameType, match.teamA.join(', '), match.teamB.join(', '))}
                  </td>
                  <td className="border border-gray-400 px-4 py-2 text-black">
                    {isEditing ? (
                      <div>
                        <input
                          type="number"
                          value={match.scoreA}
                          onChange={(e) => handleScoreChange(date, index, 'scoreA', e.target.value)}
                          className="border px-2 py-1 rounded-lg"
                        />{" "}
                        -{" "}
                        <input
                          type="number"
                          value={match.scoreB}
                          onChange={(e) => handleScoreChange(date, index, 'scoreB', e.target.value)}
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
                          onClick={() => handleDeleteMatch(date, index)}
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

      <div className="text-center mt-8">
        <h3 className="text-2xl text-black font-bold mb-4">Tulokset</h3>
        {Object.keys(gameResults).map((game) => (
          <div key={game} className="mb-6">
            <h4 className="text-xl text-black font-bold">{game}</h4>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-400 px-4 py-2 text-black">Ottelu</th>
                  <th className="border border-gray-400 px-4 py-2 text-black">Pisteet</th>
                </tr>
              </thead>
              <tbody>
                {gameResults[game].map((result, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 px-4 py-2 text-black">{result.match}</td>
                    <td className="border border-gray-400 px-4 py-2 text-black">{result.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TournamentBracket;
