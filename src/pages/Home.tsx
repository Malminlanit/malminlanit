import React from 'react';
import evilbunny from '../assets/evilbunny2.gif';

const Home = () => {
  return (
    <div className="text-white text-center p-10">
      <h1 className="text-6xl font-bold mb-10 animate-pulse">Tervetuloa Malmin LANEILLE</h1>
      
      <p className="text-lg max-w-3xl mx-auto leading-relaxed">
        Täällä <span className="font-bold text-2xl">hikoilu</span> yhdistyy 
        <span className="font-bold text-2xl"> näppäimistön klikkauksiin</span>, 
        <span className="font-bold text-2xl"> hiiren liikkeisiin</span> ja 
        <span className="font-bold text-2xl"> näyttöjen loisteeseen</span>.  
      </p>

      <p className="mt-4 text-lg max-w-3xl mx-auto leading-relaxed">
        Täällä <span className="font-bold text-2xl">tuuletetaan pelin henkeä</span>, mutta ennen kaikkea, 
        täällä <span className="font-bold text-2xl">syntyvät legendat</span>. Ei pelkkä kilpailu, vaan 
        <span className="font-bold text-2xl"> yhteisöllisyyden liekeissä taistelu</span>, 
        jossa jokainen liike ja jokainen peli <span className="font-bold text-2xl">muuttaa historian</span>.
      </p>

      <p className="mt-4 text-lg max-w-3xl mx-auto leading-relaxed">
        <span className="font-bold text-2xl">Malmin sauna</span> on se paikka, 
        missä kaikki tunteet purkautuvat ja <span className="font-bold text-2xl">voittajat sekä Legendat nousevat esiin</span>. 
        Tervetuloa liittymään tähän <span className="font-bold text-2xl">muistettavimpaan</span> ja 
        <span className="font-bold text-2xl"> vahvimpaan yhteisöön</span>, jonka Malmi on koskaan nähnyt!
      </p>

      <div className="mt-10 flex items-center justify-center">
        <img src={evilbunny} alt="Evil Bunny" className="h-300 w-auto rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default Home;
