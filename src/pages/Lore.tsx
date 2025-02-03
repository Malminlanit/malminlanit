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
					"Kauan sitten, Malmin mailla, siellä missä kadut mutkittelevat kuin ikivanha joki ja talot kohoavat korkealle kohti taivasta, syntyi suuri tarina.\n\n" +
					"Malmin lännen alue oli tunnettu paitsi vilkkaista kauppakeskuksistaan ja harvinaisista taikatuotteistaan myös sen mystisestä tunnelmasta, joka veti seikkailijoita kaikkialta maailmasta.\n\n" +
					"Kuningatar Taimi, Malmin suvereeni valtias, oli viisas ja hyväsydäminen.\n\n" +
					"Hänen valtakuntansa oli täynnä salaisuuksia, ja hänen hallitsemansa Malmi oli kuin elävä organismi, joka hengitti katujen ja kujien välistä henkeä. Kuningatar Taimi oli kuitenkin pidetty enemmän kuin pelätty. Hän hallitsi Malmin kulmakaupunkia lempeällä kädellä, mutta tiesi, että salaisuudet saattavat kääntyä koko valtakunnan kohtaloksi.\n\n" +
					"Malmin katujen välinen kulkureitti, tunnettu nimellä Kuun polku, oli vanha salainen tie, joka kuljetti asukkaita vuosituhansia taaksepäin.\n\n" +
					"Tälle tielle oli piilotettu kadonneita aarteita ja kadonnut voima, mutta vain harvat olivat uskaltaneet astua sen varjoon. Moni oli kadonnut matkoillaan, mutta vain harvat palasivat kertomaan mitä he olivat nähneet.\n\n" +
					"Eräänä päivänä saapui Malmiin nuori seikkailija, Väinö, joka oli kuullut tarinoita Kuun polusta ja päätti itse astua sen varjoon.\n\n" +
					"Väinö ei ollut tavallinen kulkija; hänellä oli oma, salainen tehtävänsä. Hän oli saanut tietää, että polun syvimmässä päässä piileksii Varjokuningas, ikivanha olento, joka oli vuosikymmenet pidätetty Malmin syvyyksissä. Kuningas oli unohdettu, mutta Väinö oli löytänyt sen jäljet.\n\n" +
					"Väinö ei ollut matkalla yksin.\n\n" +
					"Hänen mukaansa liittyi Alma, Malmin tunnettu kirjanoppinut, joka oli itsekin salaa tutkiskellut Kuun polun arvoituksia. Alma oli se, joka tiesi kaiken Kuun polusta ja sen suojatuista alueista. Hänen älykkyytensä ja muistiinsanojen avulla he selvisivät monista ansoista, joita Varjokuningas oli asettanut suojelemaan itseään.\n\n" +
					"Matka oli täynnä vaaroja.\n\n" +
					"Eräällä käänteellä he kohtasivat Iivari, Malmin katujen kuuluisa varas, joka oli jäänyt juonensa vangiksi. Iivari oli kyllästynyt elämässään ja oli tullut etsimään Kuun polulta vapautusta, mutta ei ollut valmis maksamaan hintaa. Yhteinen taistelu ansoja vastaan pakotti kuitenkin Iivarin kääntämään kelkkansa ja liittymään Väinön ja Alman seuraan.\n\n" +
					"Heidän matkaansa seurasi koko Malmin kaupunki.\n\n" +
					"Kaupunkilaiset tiesivät, että jotakin suurta oli tapahtumassa, mutta Malmin kuningatar Taimi oli päättänyt antaa seikkailijoille vapauden päättää polkunsa. \"Heidän matkansa tulee olemaan heidän oma\", Kuningatar sanoi, mutta hän seurasi tarkasti heidän kulkuaan, sillä tämä seikkailu ei ollut pelkästään heidän oma.\n\n" +
					"Matka Kuun polulle oli täynnä lumouksia, salaisuuksia ja maagisia portteja, mutta myös ystävyyksiä ja oivalluksia.\n\n" +
					"Lopulta he saapuivat polun pimeimpään syvyyteen, missä he kohtasivat Varjokuninkaan — vanhan olennon, joka oli kahlittu ja jättänyt jälkensä kaikkeen Malmin varjoon. Se ei ollut pelkästään peto, vaan ikivanha voima, joka oli kerran hallinnut koko alueen.\n\n" +
					"Taistelu oli kauhea.\n\n" +
					"Mutta Väinön rohkeus, Alman älykkyys ja Iivarin ketteryys yhdistyivät ja he pystyivät voittamaan Varjokuninkaan. Kuningas jäi ikuisesti Malmin varjoihin, mutta he eivät voineet tuoda mukanaan sitä kaikkea, mitä polku oli jättänyt taakseen.\n\n" +
					"Seikkailijat palasivat takaisin Malmiin, mutta heidän matkastaan tuli legenda.\n\n" +
					"Malmin kuningatar Taimi oli heille kiitollinen, mutta tiesi, että jokainen seikkailija ja heidän kokemuksensa olivat kätkeytyneet syvälle maan uumeniin.\n\n" +
					"Ja niin Malmin lännen tarina jäi elämään — niin Kuun polulla kuin sen varjoissa, missä seikkailijat kulkevat edelleen, etsiessään totuuksia ja kohtaamassa voimia, joita ei voi kuvitella."
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
              content={
					"Malmin lanit eivät olleet koskaan vain pelkkä tapahtuma. " +
					"Ne olivat kokoontuminen, jossa sähkö virtasi paitsi koneiden johdoissa myös ihmisten välillä – ystävyyden, kilpailun ja seikkailun kipinöinä. Mutta harva tiesi, että Malmin lanien juuret ulottuivat syvemmälle kuin kaapelit lattialla tai näytöt, jotka valaisivat yötä. Ne kytkeytyivät vanhaan tarinaan, johon liittyi Varjokuningas.\n\n" +
					"Kauan sitten, ennen kuin ensimmäinen näyttö koskaan syttyi Malmin yössä, alueella asui muinainen voima – Varjokuningas.\n\n" +
					"Hän ei ollut tavallinen hallitsija. Hän oli unohduksen valtias, varjojen muovaama olento, joka eli ihmisten unohtamissa muistoissa ja kadotetuissa hetkissä. Hänen voimansa kasvoi, kun ihmiset unohtivat vanhat tarinat, ystävyytensä ja itsensä.\n\n" +
					"Kuningatar Taimi, Malmin viisas hallitsija, tiesi Varjokuninkaan vaarat.\n\n" +
					"Hän ei voinut tuhota tätä olentoa, sillä unohdus on osa elämää. Sen sijaan hän sulki Varjokuninkaan digitaaliseen labyrinttiin, paikkaan, jota kukaan ei osannut odottaa: virtuaalimaailmaan, koodin ja bittien syövereihin. Hän loi salaisuuden, joka siirtyi sukupolvelta toiselle lanien hengessä – kilpailuissa, yhteisissä muistoissa ja ystävyydessä.\n\n" +
					"Mutta Varjokuningas ei ollut unohtanut.\n\n" +
					"Malmin lanit alkoivat vetää ihmisiä puoleensa kuin magneetti. Kilpailut, joissa pelattiin sydän pamppaillen, ja yöt, joissa ystävyydet syvenivät, loivat Valon. Tämä valo piti Varjokuninkaan vankina, sillä yhdessä jaetuissa hetkissä hän oli heikoimmillaan.\n\n" +
					"Eräänä vuonna, kun lanit olivat täynnä väkeä, jokin muuttui.\n\n" +
					"Pelit alkoivat pätkiä oudosti, verkossa näkyi häiriöitä, ja ruuduille ilmestyi salaperäisiä viestejä:\n\n" +
					"\"Muistatko, kuka olit ennen? Unohda ja minä vahvistun.\"\n\n" +
					"Se ei ollut vain bugi. Se oli Varjokuningas, joka yritti murtautua vankilastaan.\n\n" +
					"Mutta Malmin lanit eivät olleet täynnä pelkkiä pelaajia.\n\n" +
					"Siellä oli seikkailijoita, aivan kuten Väinö, Alma ja Iivari olivat olleet aiemmin. Nyt he olivat uuden sukupolven muodossa:\n" +
					"- Ella, strategiapelien mestari, jonka terävä mieli näki kaavojen läpi.\n" +
					"- Joni, nopeiden refleksejen ja rohkean sydämen omaava FPS-pelaaja.\n" +
					"- Mira, luova koodari, joka ymmärsi, että jokainen peli on tarina.\n\n" +
					"He huomasivat, että kyse ei ollut vain glitcheistä.\n\n" +
					"Se oli digitaalinen Varjopolku, salainen reitti, joka johti suoraan Varjokuninkaan luo. He loivat tiimin, mutta ei vain pelatakseen – he taistelivat ystävyyden puolesta, estääkseen Varjokuningasta valtaamasta lanien sydäntä.\n\n" +
					"Taistelu ei käyty vain peliruuduilla, vaan myös todellisuudessa:\n\n" +
					"Kaapeleita vedettiin uudelleen, palvelimia korjattiin hätäisesti, ja yhteishenki oli heidän suurin aseensa. Jokainen nauru, jokainen yhteinen muisto ja jokainen huuto tiimiltä – ne heikensivät Varjokuningasta.\n\n" +
					"Lopulta, juuri kun Varjokuningas melkein sai otteen Malmin verkosta, tapahtui jotain, mitä hän ei voinut kestää:\n\n" +
					"Joni menetti tärkeän pelin, mutta hänen ystävänsä nauroivat ja taputtivat häntä selkään.\n" +
					"Ella kaatui turnauksessa, mutta Mira ojensi käden ja sanoi:\n" +
					"\"Ei se haittaa. Olemme yhdessä tässä.\"\n\n" +
					"Se hetki mursi Varjokuninkaan siteet.\n\n" +
					"Malmin lanit jatkuivat sinä yönä pidempään kuin koskaan.\n\n" +
					"Ihmiset pelasivat, juttelivat ja rakensivat muistoja. He eivät ehkä tienneet, että olivat voittaneet pimeyden, mutta he tunsivat sen. Ja niin Varjokuningas jäi vangiksi jälleen – ei koodiin, vaan ystävyyden, yhteisön ja muistojen voimaan.\n\n" +
					"Malmin lanit eivät ole pelkästään pelejä varten.\n\n" +
					"Ne ovat paikka, jossa Varjokuningas ei koskaan voita. Koska niin kauan kuin joku nauraa, jakaa hetken ystävän kanssa ja muistaa, että he eivät ole yksin, Varjokuningas pysyy siellä, minne hän kuuluu – varjoihin."
			  }
			/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lore;
