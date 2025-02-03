import React, { useState, useEffect } from 'react';
import supabase from '../services/supabase.js';

const Tournament = () => {
  const [matchData, setMatchData] = useState({});

  useEffect(() => {
    const fetchMatchData = async () => {
      const { data, error } = await supabase.from('matches').select('match_data').single();
      if (data) {
        setMatchData(data.match_data);
      } else {
        console.error('Virhe ottelutietojen hakemisessa:', error);
      }
    };
    fetchMatchData();
  }, []);

  const handleMatchUpdate = async (date, matchIndex, updatedMatchData) => {
    setMatchData(prevData => {
      const updatedData = {
        ...prevData,
        [date]: prevData[date].map((match, i) =>
          i === matchIndex ? { ...match, ...updatedMatchData } : match
        ),
      };

      const saveToSupabase = async () => {
        const { error } = await supabase
          .from('matches')
          .upsert({ id: 1, match_data: updatedData }); // Päivitetään ensimmäinen rivi
        if (error) {
          console.error('Virhe ottelutiedon tallentamisessa:', error);
        }
      };
      saveToSupabase();
      return updatedData;
    });
  };

  return (
    <div className="tournament-container">
      {Object.keys(matchData).map((date) => (
        <div key={date} className="match-day">
          <h2>{date}</h2>
          {matchData[date].map((match, index) => (
            <div key={index} className="match">
              <input
                type="text"
                value={match.match}
                onChange={(e) => handleMatchUpdate(date, index, { match: e.target.value })}
                placeholder="Muokkaa ottelun nimeä"
              />
              <input
                type="text"
                value={match.playerA}
                onChange={(e) => handleMatchUpdate(date, index, { playerA: e.target.value })}
                placeholder="Pelaaja A"
              />
              <input
                type="text"
                value={match.playerB}
                onChange={(e) => handleMatchUpdate(date, index, { playerB: e.target.value })}
                placeholder="Pelaaja B"
              />
              <select
                value={match.game_mode}
                onChange={(e) => handleMatchUpdate(date, index, { game_mode: e.target.value })}
              >
                <option value="1vs1">1vs1</option>
                <option value="team_vs_team">Team vs Team</option>
              </select>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Tournament;
