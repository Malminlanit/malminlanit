import React from 'react';
import mother from '../assets/mother.png';

const About = () => {
  return (
    <div className="text-white text-center p-8">
      <h1 className="text-4xl font-bold mb-8">Tietoa tapahtumasta</h1>
      
      <p className="text-lg leading-relaxed mb-4">
        Malmin sydämessä olemme yhdistäneet pelit, visiot, hauskanpidon ja yhteisöllisyyden – synnyttäen unelmien LAN-kokemuksia, joita ei ole ennen nähty.
      </p>
      <p className="text-lg leading-relaxed mb-4">
        Täällä, missä kaverukset, tietokoneet ja nörttiys kohtaavat, syntyy tapahtumia, jotka jäävät historiaan. Me emme vain pelaa – me luomme
      </p>
      <span className="font-bold text-2xl">legendoja
	  </span>
	  <p> 
	  </p>
      <p className="text-lg leading-relaxed mb-4">
        yksi strategia ja ottelu kerrallaan.
      </p>
      <p className="text-lg leading-relaxed mb-4">
        CS2:n taktiikoista OW2:n tiimiyhteistyöhön, Deadlockin intensiivisiin taisteluihin ja ProPilkki-taituruuteen, me haastamme toisiamme ja valloittamme pelimaailman yhdessä.
      </p>
      <p className="text-lg leading-relaxed">
        Valmistaudu sukeltamaan Malmin sykkeeseen, jossa virtaava olut ja eeppiset pelit luovat täydellisen alustan maailman parhaalle turnaukselle!
      </p>

      <div className="mt-10 flex items-center justify-center">
        <img src={mother} alt="Mother" className="h-[300px] w-auto rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default About;
