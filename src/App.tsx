import React, { useState, useRef, useEffect } from 'react';
import logo3 from './assets/logo3.png';
import IntroVideo from "./components/IntroVideo";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Timetable from './pages/Timetable';
import Lore from './pages/Lore';
import Tournament from './pages/Tournament';
import Registration from './pages/Registration';
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
  const location = useLocation(); // React Router hook reitin tarkistamiseen

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
    // Estä introvideo tietyillä sivuilla, mutta musiikki jatkuu
    if (location.pathname === '/about' || location.pathname === '/contact') {
      setShowIntro(false);  // Estetään introvideo
    } else if (!showIntro && audioRef.current && !isPlaying) {
      audioRef.current.play(); // Jatketaan musiikin toistoa
      setIsPlaying(true);
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
      {/* Taustakuva vain tämän osan taakse */}
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
          <button 
            onClick={scrollToDetails}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105"
          >
            Lue lisää
          </button>
          <div className="absolute top- [calc(100%+15px)]left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
	  
      <div className="absolute top-0 left-0 p-4">
        <img src={logo3} alt="Logo" className="h-40 w-auto" />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-teal-900 to-indigo-900">
        {/* Taustakuva ei enää koske tätä osaa */}
        <audio ref={audioRef} autoPlay loop>
          <source src={backgroundMusic} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>

        <Router>
          <div className="min-h-screen text-white relative">
            <nav className="bg-black/30 py-4 px-6 flex justify-center space-x-6">
              <Link to="/" className="text-lg hover:text-purple-400">Etusivu</Link>
              <Link to="/about" className="text-lg hover:text-purple-400">Tietoa</Link>
              <Link to="/contact" className="text-lg hover:text-purple-400">Ohjeet</Link>
			  <Link to="/timetable" className="text-lg hover:text-purple-400">Aikataulu</Link>
			  <Link to="/Lore" className="text-lg hover:text-purple-400">Lore</Link>
			  <Link to="/tournament" className="text-lg hover:text-purple-400">Turnaus</Link>
			  <Link to="/registration" className="text-lg hover:text-purple-400">Ilmoittautuminen</Link>		  
            </nav>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
			  <Route path="/timetable" element={<Timetable />} />
			  <Route path="/Lore" element={<Lore />} />
			  <Route path="/Tournament" element={<Tournament />} />
			  <Route path="/Registration" element={<Registration />} />
            </Routes>

            <div className="fixed bottom-4 right-4 bg-black/50 p-4 rounded-xl shadow-lg">
              <button 
                onClick={togglePlayPause} 
                className="text-white hover:text-green-400 focus:outline-none"
              >
                {isPlaying ? 'Volume' : ' ' }
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

        {/* Tapahtuman tiedot */}
        <div id="details" className="container mx-auto px-4 py-24">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Tapahtuman tiedot</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
              <Calendar className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Päivämäärä ja aika</h3>
              <p>17.-21.4.2025</p>
              <p>Alkaa: Torstaina 18:00</p>
              <p>Päättyy: Maanantaina 12:00</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
              <MapPin className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Paikka</h3>
              <p>Malmin sauna, jossa legendat syntyvät ja legendoja kirjoitetaan.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
              <Users className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Kapasiteetti</h3>
              <p>Pöytiä on niin paljon kuin niitä riittää, mutta täällä ei rajoja tunneta. 
              Jos et pääse pelaamaan, ei hätää, pääset kuitenkin näkemään legendojen synnyn. 
              Kaikki mahtuvat – joko mukaan peliin tai katsomaan.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
              <Coffee className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Ruoka & juoma</h3>
              <p>24/7 Ruokailu Omakustanteinen – tankkaa itsesi ruualla sekä juomalla ja jaksat taas legendaariset hetket. 24/7 auki riippuen omasta budjetista, 
              koskaan ei tiedä, milloin iskee nälkä, mutta täällä vatsat täyttyy, energia nousee, ja peli jatkuu!</p>
              <p>Lähellä Alepa Teerisuontie</p>
              <div className="w-full h-auto rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15836.769048179707!2d24.983312487602227!3d60.25359860310647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469209b353fea185%3A0x22cfbb739db1864f!2sAlepa%20Teerisuontie!5e0!3m2!1sfi!2sfi!4v1738146067686!5m2!1sfi!2sfi" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
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
                <p className="text-lg">
                  Malmin legendat odottavat. Liity mukaan ja luo oma tarinasi!
                </p>
              </div>

              <div className="text-center md:text-left">
                <p className="text-lg">info@malminlanit.fi</p>
                
                <div className="flex justify-center gap-6 mt-4">
                  <a href="https://www.facebook.com/Malmin-Lanit" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-6 h-6 text-purple-400" />
                  </a>
                  <a href="https://twitter.com/malminlanit" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-6 h-6 text-purple-400" />
                  </a>
                  <a href="https://www.instagram.com/malminlanit" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-6 h-6 text-purple-400" />
                  </a>
                </div>
              </div>
              <div className="text-center md:text-right">
                <h4 className="font-semibold text-xl mb-2">Linkit</h4>
                <div className="space-y-2">
                  <a href="/tournament" className="block text-lg hover:text-purple-400">Turnaus</a>
                  <a href="/registration" className="block text-lg hover:text-purple-400">Ilmoittautuminen</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
