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
  
  const calculatePoints = (matchData) => {
    const points = {};

    // Käydään läpi kaikki päivät ja ottelut, lasketaan pistetilanne
    Object.keys(matchData).forEach((date) => {
      matchData[date].forEach((match) => {
        const teamA = match.match.split(' vs ')[0].trim();
        const teamB = match.match.split(' vs ')[1].trim();
        const scoreA = match.scoreA;
        const scoreB = match.scoreB;

        // Lisää joukkueet pistetilanteeseen, jos niitä ei ole vielä
        if (!points[teamA]) points[teamA] = 0;
        if (!points[teamB]) points[teamB] = 0;

        // Laske pisteet
        if (scoreA > scoreB) {
          points[teamA] += 3;  // Voitto
        } else if (scoreA < scoreB) {
          points[teamB] += 3;  // Voitto
        } else {
          points[teamA] += 1;  // Tasapeli
          points[teamB] += 1;  // Tasapeli
        }
      });
    });

    return points;
  };

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
    if (!isEditing) return;

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

  const handleAddDay = () => {
    if (!isEditing || !newDay) return;

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
    if (!isEditing) return;

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

  const points = calculatePoints(matchData);  // Lasketaan pisteet jokaisen ottelun perusteella

  return (
    <div className="bracket-container min-h-screen bg-gradient-to-br from-indigo-900 via-teal-900 to-indigo-900 text-white p-6">
      <h2 className="text-4xl font-bold text-center mb-6">Kahden joukkueen Tappeluturnaus</h2>

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

      {/* Pisteet taulukko */}
      <h3 className="text-2xl font-bold text-center mt-6 mb-4">Pistetilanne</h3>
      <table className="w-full table-auto border-collapse mb-6">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Joukkue</th>
            <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Pisteet</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(points).map((team, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2 bg-white text-black">{team}</td>
              <td className="border border-gray-400 px-4 py-2 bg-white text-black">{points[team]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Ottelut ja joukkueet */}
      {Object.keys(matchData).map((date) => (
        <div key={date} className="overflow-x-auto mb-6 bg-white/20 backdrop-blur-lg rounded-xl">
          <h3 className="text-xl text-center text-black font-bold mb-2">
            {date}
            {isEditing && (
              <button 
                onClick={() => handleDeleteDay(date)}
                className="text-sm text-red-500 ml-2"
              >
                Poista päivä
              </button>
            )}
          </h3>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Aika</th>
                <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Ottelu</th>
                <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Pisteet</th>
                {isEditing && (
                  <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-black">Poista</th>
                )}
              </tr>
            </thead>
            <tbody>
              {matchData[date].map((match, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2 bg-white text-black">{match.time}</td>
                  <td className="border border-gray-400 px-4 py-2 bg-white text-black">
                    <div>
                      <input
                        type="text"
                        value={match.teamA.join(", ")}
                        onChange={(e) => handleTeamChange(date, index, 'teamA', e.target.value)}
                        className="w-full bg-gray-200 rounded-md text-black"
                        disabled={!isEditing}
                      />
                      <span>vs</span>
                      <input
                        type="text"
                        value={match.teamB.join(", ")}
                        onChange={(e) => handleTeamChange(date, index, 'teamB', e.target.value)}
                        className="w-full bg-gray-200 rounded-md text-black"
                        disabled={!isEditing}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-400 px-4 py-2 bg-white text-black">
                    <input 
                      type="number" 
                      value={match.scoreA}
                      onChange={(e) => handleScoreChange(date, index, 'scoreA', e.target.value)}
                      className={`w-16 bg-gray-200 rounded-md text-black ${!isEditing ? 'bg-gray-300' : ''}`}
                      disabled={!isEditing}
                    />
                    -
                    <input 
                      type="number" 
                      value={match.scoreB}
                      onChange={(e) => handleScoreChange(date, index, 'scoreB', e.target.value)}
                      className={`w-16 bg-gray-200 rounded-md text-black ${!isEditing ? 'bg-gray-300' : ''}`}
                      disabled={!isEditing}
                    />
                  </td>
                  {isEditing && (
                    <td className="border border-gray-400 px-4 py-2 bg-white text-black">
                      <button
                        onClick={() => handleDeleteMatch(date, index)}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
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
              className="bg-green-500 text-white px-6 py-2 mt-4 rounded-lg"
            >
              Lisää uusi ottelu
            </button>
          )}
        </div>
      ))}

      {isEditing && (
        <button
          onClick={handleSave}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 mt-6 rounded-lg"
        >
          Tallenna muutokset
        </button>
      )}
    </div>
  );
}

export default TournamentBracket;
