import React, { useState, useEffect } from 'react'; 
import supabase from '../services/supabase.js'; 

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
  const [newDay, setNewDay] = useState(''); 

  useEffect(() => {
    const getSchedule = async () => {
      const { data, error } = await supabase
        .from('schedules')
        .select('schedule')
        .single();

      if (data) {
        setScheduleData(data.schedule);
      } else {
        console.error('Virhe aikataulun hakemisessa:', error);
      }
    };

    getSchedule();
  }, []);

  const handleLogin = () => {
    if (password === 'salasana123') {
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

      const saveToSupabase = async () => {
        const { error } = await supabase
          .from('schedules')
          .upsert({ id: 1, schedule: updatedData });
        if (error) {
          console.error('Virhe aikataulun tallentamisessa:', error);
        }
      };
      saveToSupabase();
      return updatedData;
    });
  };

  const handleAddRow = (date) => {
    setScheduleData(prevData => {
      const updatedData = { ...prevData };
      if (!updatedData[date]) {
        updatedData[date] = [];
      }
      updatedData[date].push({ time: "", event: "" });

      const saveToSupabase = async () => {
        const { error } = await supabase
          .from('schedules')
          .upsert({ id: 1, schedule: updatedData });
        if (error) {
          console.error('Virhe aikataulun tallentamisessa:', error);
        }
      };
      saveToSupabase();
      return updatedData;
    });
  };

  const handleDeleteRow = (date, index) => {
    setScheduleData(prevData => {
      const updatedData = { ...prevData };
      updatedData[date].splice(index, 1); 

      const saveToSupabase = async () => {
        const { error } = await supabase
          .from('schedules')
          .upsert({ id: 1, schedule: updatedData });
        if (error) {
          console.error('Virhe aikataulun tallentamisessa:', error);
        }
      };
      saveToSupabase();
      return updatedData;
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      {isEditing ? (
        <>
          <h2>Aikataulun muokkaus</h2>
          <table>
            <thead>
              <tr>
                <th>Päivämäärä</th>
                <th>Aika</th>
                <th>Tapahtuma</th>
                <th>Toiminnot</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(scheduleData).map(date => (
                <React.Fragment key={date}>
                  {scheduleData[date].map((event, index) => (
                    <tr key={index}>
                      <td style={{ color: 'black' }}>{date}</td>
                      <td>
                        <input
                          type="text"
                          value={event.time}
                          onChange={(e) =>
                            handleEventChange(date, index, 'time', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={event.event}
                          onChange={(e) =>
                            handleEventChange(date, index, 'event', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <button onClick={() => handleDeleteRow(date, index)}>Poista</button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <button onClick={() => handleAddRow(newDay)}>Lisää uusi rivi</button>
        </>
      ) : (
        <>
          <h2>Syötä salasana muokataksesi aikataulua</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Kirjaudu sisään</button>
        </>
      )}
    </div>
  );
}

export default Schedule;
