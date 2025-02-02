// src/services/supabase.js
import { createClient } from '@supabase/supabase-js';

// Määrittele Supabase URL ja API-avaimet, jotka löydät Supabase-konsolista
const supabase = createClient(
  'https://ugbtawotpwglwoujauzs.supabase.com',  // Supabase-projektisi URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnYnRhd290cHdnbHdvdWphdXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MzYwNjIsImV4cCI6MjA1NDExMjA2Mn0.9j-Egvs9bJHzsmUDmQ1WVwm9EjtkOvbbS1E6wmEFp1M'  // Supabase-projektisi anonyymi avain
);

export default supabase;
