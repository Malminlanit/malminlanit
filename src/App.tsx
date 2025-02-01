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
import introVideo from './assets/intro.mp4'; // Importoi intro-video

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedPage, setSelectedPage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showIntro, setShowIntro] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 5000); // Piilottaa intron 5 sekunnin jälkeen
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  const handlePageChange = (e) => {
    setSelectedPage(e.target.value);
    if (e.target.value) {
      window.location.href = e.target.value;
    }
  };

  const scrollToDetails = () => {
    document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' });
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

  if (showIntro) {
    return (
      <video src={introVideo} autoPlay muted className="w-full h-screen object-cover" />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-teal-900 to-indigo-900">
      <audio ref={audioRef} autoPlay loop>
        <source src={backgroundMusic} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <div className="absolute top-0 left-0 p-4">
        <img src={logo3} alt="Logo" className="h-40 w-auto" />
      </div>

      <Router>
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-teal-900 to-indigo-900 text-white">
          <nav className="bg-black/30 py-4 px-6 flex justify-center space-x-6">
            <Link to="/" className="hover:text-purple-400">Etusivu</Link>
            <Link to="/about" className="hover:text-purple-400">Tietoa</Link>
            <Link to="/contact" className="hover:text-purple-400">Ohjeet</Link>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
