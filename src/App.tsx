import React, { useState } from 'react';
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

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  const scrollToDetails = () => {
    document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900">
      {/* Hero Section */}
      <div 
        className="h-screen relative flex items-center justify-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative text-center px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Monitor className="w-12 h-12 text-purple-400" />
            <h1 className="text-6xl font-bold text-white">EPIC LAN 2024</h1>
          </div>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join us for the biggest gaming event of the year! 48 hours of non-stop gaming,
            competitions, and unforgettable moments.
          </p>
          <button 
            onClick={scrollToDetails}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105"
          >
            Learn More
          </button>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div id="details" className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Event Details</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <Calendar className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Date & Time</h3>
            <p>March 15-17, 2024</p>
            <p>Starts: Friday 18:00</p>
            <p>Ends: Sunday 18:00</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <MapPin className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Location</h3>
            <p>Gaming Arena</p>
            <p>123 Gamer Street</p>
            <p>Tech City, TC 12345</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <Users className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Capacity & Price</h3>
            <p>150 Players Maximum</p>
            <p className="font-bold text-purple-400">$75 per person</p>
            <p className="text-sm">Early bird: $60</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <Coffee className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Food & Drinks</h3>
            <p>24/7 Snack Bar</p>
            <p>Pizza Included</p>
            <p>Energy Drinks Available</p>
          </div>
        </div>
      </div>

      {/* What to Bring */}
      <div className="bg-white/5 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">What to Bring</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
              <Laptop className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-4">Gaming Equipment</h3>
              <ul className="space-y-2">
                <li>• Gaming PC/Laptop</li>
                <li>• Monitor (max 27")</li>
                <li>• Keyboard & Mouse</li>
                <li>• Headphones</li>
                <li>• Power Strip</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
              <Network className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-4">Network Requirements</h3>
              <ul className="space-y-2">
                <li>• Ethernet Cable (5m min)</li>
                <li>• Updated Games</li>
                <li>• Steam/Epic Account</li>
                <li>• Discord Installed</li>
                <li>• Updated Drivers</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
              <Backpack className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-4">Personal Items</h3>
              <ul className="space-y-2">
                <li>• Sleeping Bag</li>
                <li>• Toiletries</li>
                <li>• Change of Clothes</li>
                <li>• Deodorant</li>
                <li>• Water Bottle</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Registration */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Register Now</h2>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Reserve Your Spot
                </button>
              </form>
            ) : (
              <div className="text-white">
                <h3 className="text-xl font-bold mb-2">Thanks for registering!</h3>
                <p>We'll send you payment details shortly.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/30 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <Monitor className="w-6 h-6 text-purple-400" />
                <span className="font-bold text-xl">EPIC LAN</span>
              </div>
              <p className="text-gray-400">The Ultimate Gaming Experience</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Mail className="w-5 h-5 text-purple-400" />
                <a href="mailto:info@epiclan.com" className="hover:text-purple-400 transition-colors">
                  info@epiclan.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-5 h-5 text-purple-400" />
                <a href="tel:+1234567890" className="hover:text-purple-400 transition-colors">
                  (123) 456-7890
                </a>
              </div>
            </div>

            <div className="text-center md:text-right">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                Tournament Rules
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;