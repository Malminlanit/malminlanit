import React, { useState, useRef, useEffect } from 'react';
import logo3 from './assets/logo3.png';
import IntroVideo from "./components/IntroVideo";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import { 
  Monitor, 
  Calendar, 
  MapPin, 
  Users, 
  Coffee,
  Laptop,
  Network,
  Backpack,
  Mail,
  Phone,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import backgroundMusic from './assets/background-music.mp3';
import introVideo from './assets/intro.mp4'; // Intro-video

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedPage, setSelectedPage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showIntro, setShowIntro] = useState(true);
  const audioRef = useRef(null);

  const handleIntroEnd = () => {
    setShowIntro(false);
  };

  const handleSkipIntro = () => {
    setShowIntro(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  const scrollToDetails = () => {
    document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePageChange = (e) => {
    setSelectedPage(e.target.value);
    if (e.target.value) {
      window.location.href = e.target.value;
    }
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
    // Jos introvideo on jo päättynyt, musiikki käynnistetään automaattisesti.
    if (!showIntro && audioRef.current && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [showIntro, isPlaying]);

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
    <Router>
      <div 
        className="h-screen relative flex items-center justify-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1633545505446-586bf83717f0?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-teal-900 to-indigo-900">
          {/* Taustakuva */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative text-center px-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Monitor className="w-12 h-12 text-purple-400" />
              <h1 className="text-6xl font-bold text-white">Malmin LANIT 2025</h1>
            </div>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Liity seuraamme vuoden parhampaan tapahtumaan!
            </p>
            <button 
              onClick={scrollToDetails}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105"
            >
              Lue lisää
            </button>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <ChevronDown className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Tapahtuman tiedot */}
          <div id="details" className="container mx-auto px-4 py-24">
            <h2 className="text-4xl font-bold text-white text-center mb-16">Tapahtuman tiedot</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Tiedot */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                <Calendar className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Päivämäärä ja aika</h3>
                <p>17.-21.4.2025</p>
                <p>Alkaa: Torstaina 18:00</p>
                <p>Päättyy: Maanantaina 12:00</p>
              </div>

              {/* Muu sisältö */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                <MapPin className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Paikka</h3>
                <p>Malmin sauna, jossa legendat syntyvät ja legendoja kirjoitetaan.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                <Users className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Kapasiteetti</h3>
                <p>Pöytiä on niin paljon kuin niitä riittää...</p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                <Coffee className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Ruoka & juoma</h3>
                <p>24/7 Ruokailu Omakustanteinen...</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-black/30 text-white py-12">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                    <img src={logo3} alt="Logo" className="h-16 w-auto" />
                    <span className="font-bold text-xl">MALMIN LANIT</span>
                  </div>
                  <p className="text-gray-400">Alkoholin Huuruista Suunnittelua – Jo Vuodesta 2024</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <a href="mailto:malminlanit@gmail.com" className="hover:text-purple-400 transition-colors">
                      malminlanit@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
