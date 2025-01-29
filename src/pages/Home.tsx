import React from 'react';
import evilbunny from './assets/evilbunny.jpg';
const Home = () => {
  return (
    <div className="text-white text-center p-10">
      <h1 className="text-6xl font-bold">Tervetuloa Malmin LANEILLE</h1>
      <p> </p>
	  <p> </p>
	  <p> </p>
	  <p>Täällä hikoilu yhdistyy näppäimistön klikkauksiin, hiiren liikkeisiin ja näyttöjen loisteeseen. 
	  Täällä tuuletetaan pelin henkeä, mutta ennen kaikkea, täällä syntyy legendoja. 
	  Ei pelkkä kilpailu, vaan yhteisöllisyyden liekeissä taistelu, jossa jokainen liike ja jokainen peli muuttaa historian.
	  Malmin sauna on se paikka, missä kaikki tunteet purkautuvat, ja voittajat ja legendat nousevat esiin. 
	  Tervetuloa liittymään tähän muistettavimpaan ja vahvimpaan yhteisöön, jonka Malmi on koskaan nähnyt!</p>
    </div>
	
	<div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <img src={evilbunny} alt="evilbunny" className="h-16 w-auto" />
	</div>
  );
};

export default Home;
