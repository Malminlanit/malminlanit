import React from 'react';
import evilbunny from '../assets/evilbunny.jpg';

const Home = () => {
  return (
    <div className="text-white text-center p-10">
      <h1 className="text-6xl font-bold mb-10 animate-pulse">Tervetuloa Malmin LANEILLE</h1>
      
      <p className="text-lg max-w-3xl mx-auto leading-relaxed">
        Täällä <span className="text-purple-400 font-bold">hikoilu</span> yhdistyy 
        <span className="text-blue-400 font-bold"> näppäimistön klikkauksiin</span>, 
        <span className="text-green-400 font-bold"> hiiren liikkeisiin</span> ja 
        <span className="text-red-400 font-bold"> näyttöjen loisteeseen</span>.  
      </p>

      <p className="mt-4 text-lg max-w-3xl mx-auto leading-relaxed">
        Täällä <span className="text-yellow-400 font-bold">tuuletetaan pelin henkeä</span>, mutta ennen kaikkea, 
        täällä <span className="text-red-500 font-bold">syntyvät legendat</span>. Ei pelkkä kilpailu, vaan 
        <span className="text-indigo-400 font-bold"> yhteisöllisyyden liekeissä taistelu</span>, 
        jossa jokainen liike ja jokainen peli <span className="text-orange-400 font-bold">muuttaa historian</span>.
      </p>

      <p className="mt-4 text-lg max-w-3xl mx-auto leading-relaxed">
        <span className="text-red-500 font-bold">Malmin sauna</span> on se paikka, 
        missä kaikki tunteet purkautuvat ja <span className="text-green-400 font-bold">voittajat sekä Legendat nousevat esiin</span>. 
        Tervetuloa liittymään tähän <span className="text-purple-400 font-bold">muistettavimpaan</span> ja 
        <span className="text-blue-400 font-bold"> vahvimpaan yhteisöön</span>, jonka Malmi on koskaan nähnyt!
      </p>

      <div className="mt-10 flex items-center justify-center">
        <img src={evilbunny} alt="Evil Bunny" className="h-150 w-auto rounded-lg shadow-lg border-4 border-purple-600" />
      </div>
    </div>
  );
};

export default Home;
