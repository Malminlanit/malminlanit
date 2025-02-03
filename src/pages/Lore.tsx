import React, { useState } from 'react';
import Story from '../components/Story'; // Assuming you have a Story component

const Lore = () => {
  const [selectedStory, setSelectedStory] = useState('story1');

  const handleStoryChange = (story: string) => {
    setSelectedStory(story);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black p-6">
      <div className="text-white text-center p-8 max-w-4xl bg-gray-800 bg-opacity-80 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-8 text-purple-400 animate-pulse">
          Malmin Lännen Tarina: Seikkailu Kuningattaren Varjossa
        </h1>

        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {[
            { key: 'story1', label: 'Malmin Kuningatar' },
            { key: 'story2', label: 'Malmin Taistelu' },
            { key: 'story3', label: 'Ystävyyden Voima' },
            { key: 'story4', label: 'Varjokuningas' }
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`px-4 py-2 rounded-xl transition-transform transform hover:scale-105 shadow-lg ${
                selectedStory === key
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-500 text-gray-200 hover:bg-purple-700'
              }`}
              onClick={() => handleStoryChange(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="p-6 bg-gray-700 bg-opacity-70 rounded-xl shadow-inner">
          {selectedStory === 'story1' && (
            <Story
              title="Malmin Kuningatar"
              content={
                "Malmin lanit eivät olleet koskaan vain pelkkä tapahtuma. Ne olivat kokoontuminen, jossa sähkö virtasi paitsi koneiden johdoissa myös ihmisten välillä – ystävyyden, kilpailun ja seikkailun kipinöinä. Mutta harva tiesi, että Malmin lanien juuret ulottuivat syvemmälle kuin kaapelit lattialla tai näytöt, jotka valaisivat yötä. Ne kytkeytyivät vanhaan tarinaan, johon liittyi Varjokuningas. Kauan sitten, ennen kuin ensimmäinen näyttö koskaan syttyi Malmin yössä, alueella asui muinainen voima – Varjokuningas. Hän ei ollut tavallinen hallitsija. Hän oli unohduksen valtias, varjojen muovaama olento, joka eli ihmisten unohtamissa muistoissa ja kadotetuissa hetkissä. Hänen voimansa kasvoi, kun ihmiset unohtivat vanhat tarinat, ystävyytensä ja itsensä. Kuningatar Taimi, Malmin viisas hallitsija, tiesi Varjokuninkaan vaarat. Hän ei voinut tuhota tätä olentoa, sillä unohdus on osa elämää. Sen sijaan hän sulki Varjokuninkaan digitaaliseen labyrinttiin, paikkaan, jota kukaan ei osannut odottaa: virtuaalimaailmaan, koodin ja bittien syövereihin. Hän loi salaisuuden, joka siirtyi sukupolvelta toiselle lanien hengessä – kilpailuissa, yhteisissä muistoissa ja ystävyydessä." +
                "Mutta Varjokuningas ei ollut unohtanut. Malmin lanit alkoivat vetää ihmisiä puoleensa kuin magneetti. Kilpailut, joissa pelattiin sydän pamppaillen, ja yöt, joissa ystävyydet syvenivät, loivat Valon. Tämä valo piti Varjokuninkaan vankina, sillä yhdessä jaetuissa hetkissä hän oli heikoimmillaan." +
                "Eräänä vuonna, kun lanit olivat täynnä väkeä, jokin muuttui. Pelit alkoivat pätkiä oudosti, verkossa näkyi häiriöitä, ja ruuduille ilmestyi salaperäisiä viestejä: Muistatko, kuka olit ennen? Unohda ja minä vahvistun." +
                "Se ei ollut vain bugi. Se oli Varjokuningas, joka yritti murtautua vankilastaan. Mutta Malmin lanit eivät olleet täynnä pelkkiä pelaajia. Siellä oli seikkailijoita, aivan kuten Väinö, Alma ja Iivari olivat olleet aiemmin. Nyt he olivat uuden sukupolven muodossa: Ella, strategiapelien mestari, jonka terävä mieli näki kaavojen läpi. Joni, nopeiden refleksejen ja rohkean sydämen omaava FPS-pelaaja. Mira, luova koodari, joka ymmärsi, että jokainen peli on tarina." +
                "He huomasivat, että kyse ei ollut vain glitcheistä. Se oli digitaalinen Varjopolku, salainen reitti, joka johti suoraan Varjokuninkaan luo. He loivat tiimin, mutta ei vain pelatakseen – he taistelivat ystävyyden puolesta, estääkseen Varjokuningasta valtaamasta lanien sydäntä. Taistelu ei käyty vain peliruuduilla, vaan myös todellisuudessa: kaapeleita vedettiin uudelleen, palvelimia korjattiin hätäisesti, ja yhteishenki oli heidän suurin aseensa. Jokainen nauru, jokainen yhteinen muisto ja jokainen huuto tiimiltä – ne heikensivät Varjokuningasta. Lopulta, juuri kun Varjokuningas melkein sai otteen Malmin verkosta, tapahtui jotain, mitä hän ei voinut kestää. Joni menetti tärkeän pelin, mutta hänen ystävänsä nauroivat ja taputtivat häntä selkään. Ella kaatui turnauksessa, mutta Mira ojensi käden ja sanoi: Ei se haittaa. Olemme yhdessä tässä. Se hetki mursi Varjokuninkaan siteet. Malmin lanit jatkuivat sinä yönä pidempään kuin koskaan. Ihmiset pelasivat, juttelivat ja rakensivat muistoja. He eivät ehkä tienneet, että olivat voittaneet pimeyden, mutta he tunsivat sen. Ja niin Varjokuningas jäi vangiksi jälleen – ei koodiin, vaan ystävyyden, yhteisön ja muistojen voimaan. Malmin lanit eivät ole pelkästään pelejä varten. Ne ovat paikka, jossa Varjokuningas ei koskaan voita. Koska niin kauan kuin joku nauraa, jakaa hetken ystävän kanssa ja muistaa, että he eivät ole yksin, Varjokuningas pysyy siellä, minne hän kuuluu – varjoihin."
              }
            />
          )}
          {selectedStory === 'story2' && (
            <Story
              title="Malmin Taistelu"
              content="Kauan sen jälkeen, kun Väinö, Alma ja Iivari olivat palanneet Kuun polulta... (jatkuu)"
            />
          )}
          {selectedStory === 'story3' && (
            <Story
              title="Ystävyyden Voima"
              content="Malmin yllä lepäsi jälleen rauha. Kuningatar Taimin viisaus oli johdattanut kaupungin... (jatkuu)"
            />
          )}
          {selectedStory === 'story4' && (
            <Story
              title="Varjokuningas"
              content="Malmin lanit eivät olleet koskaan vain pelkkä tapahtuma. Ne olivat kokoontuminen... (jatkuu)"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Lore;
