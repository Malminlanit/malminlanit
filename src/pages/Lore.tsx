import React, { useState } from 'react';

const Lore = () => {
  const [selectedStory, setSelectedStory] = useState('story1');

  const handleStoryChange = (story) => {
    setSelectedStory(story);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-white text-center p-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Malmin Lännen Tarina: Seikkailu Kuningattaren Varjossa</h1>

        <div className="mb-6">
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded mr-4"
            onClick={() => handleStoryChange('story1')}
          >
            Malmin Kuningatar
          </button>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded mr-4"
            onClick={() => handleStoryChange('story2')}
          >
            Malmin Taistelu
          </button>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded mr-4"
            onClick={() => handleStoryChange('story3')}
          >
            Ystävyyden Voima
          </button>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded"
            onClick={() => handleStoryChange('story4')}
          >
            Varjokuningas
          </button>
        </div>

        {selectedStory === 'story1' && (
          <div>
            <h2 className="text-2xl font-semibold text-purple-400">Malmin Kuningatar</h2>
            <p className="text-lg leading-relaxed mb-4">
              Tämä on tarina Malmin Kuningattaresta, joka johdatti kylän sankareita ja johdatti heidät moniin seikkailuihin. Hän oli tunnettu viisaudestaan ja kyvystään kohdata maailman vaarat pelotta. Kuningatar Taimi oli sydämeltään lempeä, mutta hänen tahtonsa oli yhtä vahva kuin Malmin maaperä.
            </p>
          </div>
        )}

        {selectedStory === 'story2' && (
          <div>
            <h2 className="text-2xl font-semibold text-purple-400">Malmin Taistelu</h2>
            <p className="text-lg leading-relaxed mb-4">
              Tämä tarina vie meidät Malmin suurimpaan taisteluun, jossa rohkeat sankarit puolustivat kotikyläänsä vaarallisilta hyökkääjiltä. Taistelu oli ankara ja täynnä yllättäviä käänteitä, mutta sankarit osoittivat uskomatonta rohkeutta ja yhtenäisyyttä. Malmi ei antautunut.
            </p>
          </div>
        )}

        {selectedStory === 'story3' && (
          <div>
            <h2 className="text-2xl font-semibold text-purple-400">Ystävyyden Voima</h2>
            <p className="text-lg leading-relaxed mb-4">
              Tässä tarinassa Malmin sankarit löytävät voiman ystävyydestä. He kohtaavat yhdessä suuria esteitä ja näyttävät, kuinka tärkeää on luottaa toisiinsa. Ystävyyden voima antaa heille rohkeuden kohdata vaarat ja voittaa ne.
            </p>
          </div>
        )}

        {selectedStory === 'story4' && (
          <div>
            <h2 className="text-2xl font-semibold text-purple-400">Varjokuningas</h2>
            <p className="text-lg leading-relaxed mb-4">
              Tämä tarina kertoo Varjokuninkaan paluusta Malmin varjoista. Hän oli olento, joka oli kerran hallinnut koko alueen, mutta oli jäänyt unohduksiin. Väinö ja hänen toverinsa Alma ja Iivari matkasivat Kuun polkua kohti Varjokuninkaan linnaa. Tarina on täynnä taikuutta ja vaaroja, ja se haastaa sankarit kohtaamaan oman pelkonsa.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lore;
