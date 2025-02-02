// src/components/Schedule.js
import React, { useState, useEffect } from 'react';
import supabase from '../services/supabase';  // Tuodaan supabase.js tiedosto

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('');

  // Lue aikataulut Supabasesta
  useEffect(() => {
    const getSchedule = async () => {
      const { data, error } = await supabase
        .from('schedules')
        .select('*')
        .single();

      if (data) {
        setScheduleData(data.schedule);
      }
    };

    getSchedule();
  }, []);

  // Tallenna aikataulu Supabaseen
  const handleSave = async () => {
    const { error } = await supabase
      .from('schedules')
      .upsert({ id: 1, schedule: scheduleData });

    if (error) {
      console.error(error);
    } else {
      alert('Aikataulu tallennettu Supabaseen!');
    }

    setIsEditing(false);
  };

  return (
    <div>
      {/* Sama renderöinti kuin aiemmin */}
      {/* ... */}
    </div>
  );
};

export default Schedule;
