import React, { useState, useRef, useEffect } from 'react';
import logo3 from './assets/logo3.png';
import IntroVideo from "./components/IntroVideo";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Timetable from './pages/Timetable';
import { 
  Monitor, 
  Calendar, 
  MapPin, 
  Users, 
  Coffee,
  ChevronDown
} from 'lucide-react';
import backgroundMusic from './assets/background-music.mp3';
import introVideo from './assets/intro.mp4'; // Importoi intro-video
import netlifyIdentity from 'netlify-identity-widget';
import LoginButton from './components/LoginButton';
import { saveScheduleToGitHub } from './utils/github'; // Importoi GitHub-päivitys

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedPage, setSelectedPage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showIntro, setShowIntro] = useState(true);
  const [user, setUser] = useState(null); // User state
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

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    netlifyIdentity.logout();
    setUser(null);
  };

  useEffect(() => {
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
    <div className="h-screen relative">
      <div 
        className="w-full h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1633545505446-586bf83717f0?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative text-center px-4 py-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Monitor className="w-12 h-12 text-purple-400" />
            <h1 className="text-6xl font-bold text-white">Malmin LANIT 2025</h1>
          </div>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Liity seuraamme vuoden parhaimpaan tapahtumaan!
          </p>
		  <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
				<button 
				onClick={scrollToDetails}
				className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105"
			  >
				Lue lisää
			  </button>
			  <ChevronDown className="w-8 h-8 text-white animate-bounce mt-4" />
		   </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 p-4">
        <img src={logo3} alt="Logo" className="h-40 w-auto" />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-teal-900 to-indigo-900">
        <audio ref={audioRef} autoPlay loop>
          <source src={backgroundMusic} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>

        <Router>
          <div className="min-h-screen text-white relative">
            <nav className="bg-black/30 py-4 px-6 flex justify-center space-x-6">
              <Link to="/" className="hover:text-purple-400">Etusivu</Link>
              <Link to="/about" className="hover:text-purple-400">Tietoa</Link>
              <Link to="/contact" className="hover:text-purple-400">Ohjeet</Link>
			  <Link to="/timetable" className="hover:text-purple-400">Aikataulu</Link>
            </nav>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
			  <Route path="/timetable" element={<Timetable />} />
            </Routes>

            <div className="fixed bottom-4 right-4 bg-black/50 p-4 rounded-xl shadow-lg">
              <button 
                onClick={togglePlayPause} 
                className="text-white hover:text-green-400 focus:outline-none"
              >
                {isPlaying ? 'Volume' : ' '}
              </button>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume} 
                onChange={handleVolumeChange} 
                className="ml-2"
              />
            </div>
          </div>
        </Router>

        <footer className="bg-black/30 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-2">
              <LoginButton onLogin={handleLogin} />
              {user && (
                <div className="mt-4 text-white">
                  <p>Logged in as: {user.user_metadata.full_name}</p>
                  <button 
                    onClick={handleLogout} 
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
