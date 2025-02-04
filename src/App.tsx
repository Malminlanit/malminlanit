import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import logo3 from './assets/logo3.png';
import IntroVideo from "./components/IntroVideo";
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Timetable from './pages/Timetable';
import Lore from './pages/Lore';
import Tournament from './pages/Tournament';
import Registration from './pages/Registration';
import backgroundMusic from './assets/background-music.mp3';
import introVideo from './assets/intro.mp4'; // Importoi intro-video

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showIntro, setShowIntro] = useState(true);
  const audioRef = useRef(null);
  const location = useLocation(); // Hakee reitin tiedot

  const handleIntroEnd = () => {
    setShowIntro(false); // Poistetaan intro-video, kun se päättyy
  };

  const handleSkipIntro = () => {
    setShowIntro(false); // Ohitetaan intro-video
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    // Näytetään intro-video vain, jos ollaan etusivulla
    if (location.pathname !== '/') {
      setShowIntro(false); // Estetään video muiden sivujen kohdalla
    } else if (location.pathname === '/' && !showIntro) {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play(); // Käynnistetään musiikki, jos video ei ole näkyvissä
        setIsPlaying(true);
      }
    }
  }, [location.pathname, showIntro, isPlaying]);

  if (showIntro) {
    return (
      <div className="relative w-full h-screen">
        <video 
          src={introVideo} 
          autoPlay 
          className="w-full h-screen object-cover" 
          onEnded={handleIntroEnd} 
          controls
        />
        <button 
          onClick={handleSkipIntro} 
          className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-md hover:bg-red-500"
        >
          Skip
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen relative">
      <audio ref={audioRef} autoPlay loop>
        <source src={backgroundMusic} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <Router>
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-teal-900 to-indigo-900">
          <nav className="bg-black/30 py-4 px-6 flex justify-center space-x-6">
            <Link to="/" className="text-lg hover:text-purple-400">Etusivu</Link>
            <Link to="/about" className="text-lg hover:text-purple-400">Tietoa</Link>
            <Link to="/contact" className="text-lg hover:text-purple-400">Ohjeet</Link>
            <Link to="/timetable" className="text-lg hover:text-purple-400">Aikataulu</Link>
            <Link to="/lore" className="text-lg hover:text-purple-400">Lore</Link>
            <Link to="/tournament" className="text-lg hover:text-purple-400">Turnaus</Link>
            <Link to="/registration" className="text-lg hover:text-purple-400">Ilmoittautuminen</Link>
          </nav>

          <Rou
