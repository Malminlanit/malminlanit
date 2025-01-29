import React, { useState, useRef } from 'react';
import logo3 from './assets/logo3.png';
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
import backgroundMusic from './assets/background-music.mp3';  // Importoi MP3-tiedosto

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedPage, setSelectedPage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPage(e.target.value);
    if (e.target.value) {
      window.location.href = e.target.value;  // Siirtää valitulle sivulle
    }
  };

  const scrollToDetails = () => {
    document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Toistopainikkeen toiminto (play/pause)
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

  // Äänenvoimakkuuden säätö
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-teal-900 to-indigo-900">
      {/* Taustamusiikki */}
      <audio ref={audioRef} autoPlay loop>
        <source src={backgroundMusic} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Hero Section */}
      <div 
        className="h-screen relative flex items-center justify-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1633545505446-586bf83717f0?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
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
      </div>

      <div className="absolute top-0 left-0 p-4">
        <img src={logo3} alt="Logo" className="h-40 w-auto" />
      </div>

      <Router>
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-teal-900 to-indigo-900 text-white">
          {/* Navigointipalkki */}
          <nav className="bg-black/30 py-4 px-6 flex justify-center space-x-6">
            <Link to="/" className="hover:text-purple-400">Etusivu</Link>
            <Link to="/about" className="hover:text-purple-400">Tietoa</Link>
            <Link to="/contact" className="hover:text-purple-400">Yhteystiedot</Link>
          </nav>

          {/* Reitit eri sivuille */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
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
            <p>Malmin sauna</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <Users className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Kapasiteetti</h3>
            <p>Niin paljon kuin pöytiä riittää, katsomaan saa myös tulla.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <Coffee className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Ruoka & juoma</h3>
            <p>24/7 Snack Bar, omakustanteinen</p>
            <p>Lähellä Alepa</p>
            <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15836.769048179707!2d24.983312487602227!3d60.25359860310647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469209b353fea185%3A0x22cfbb739db1864f!2sAlepa%20Teerisuontie!5e0!3m2!1sfi!2sfi!4v1738146067686!5m2!1sfi!2sfi" 
                width="600" 
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
              <img src={logo3} alt="Logo" className="h-40 w-auto" />
                <span className="font-bold text-xl">MALMIN LANIT</span>
              </div>
              <p className="text-gray-400">Alkoholin Huuruista Suunnittelua – Jo Vuodesta 2024</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Mail className="w-5 h-5 text-purple-400" />
                <a href="malminlanit@gmail.com" className="hover:text-purple-400 transition-colors">
                  malminlanit@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Musiikin hallinta */}
      <div className="absolute bottom-4 right-4 bg-black/50 p-4 rounded-lg">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlayPause}
            className="text-white bg-purple-600 hover:bg-purple-700 p-2 rounded-full"
          >
            {isPlaying ? 'Pysäytä' : 'Toista'}
          </button>

          <div className="flex items-center space-x-2">
            <label htmlFor="volume" className="text-white">Äänenvoimakkuus</label>
            <input
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-32"
            />
            <span className="text-white">{(volume * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
