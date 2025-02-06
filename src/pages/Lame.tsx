import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Vastaukset taulukossa, jossa jokaisella kysymyksellä on useampi vaihtoehto
const responses = {
  "Kerro tarina": [
    "Kauan sitten Malmin LANeilla, legendaarinen pelaaja nousi esiin...",
    "Malmin tarinoissa on aina rohkeita sankareita, mutta tämä oli jotain erityistä...",
    "Yksi legenda kertoo nuoresta pelaajasta, joka voitti koko turnauksen ja sai valtavan kunnian."
  ],
  "Anna vinkki": [
    "Älä koskaan aliarvioi vastustajaasi – ja muista pitää taukoja!",
    "Muista, että yhteistyö on tärkeämpää kuin yksilösuoritus. Yksi tiimi, yksi voitto!",
    "Pysy rauhallisena, vaikka häviätkin – voitat sen takaisin!"
  ],
  "Mikä on Malmin lanien salaisuus?": [
    "Sanotaan, että jos voitat kolme turnausta putkeen, pääset Malmin kuningattaren audienssille...",
    "Tämä salaisuus ei ole vain peliä – se on elämäntapa, joka vie voittoon.",
    "Monet sanovat, että se on jännityksen ja ystävyyden sekoitus, joka tekee Malmin LANeista niin erityiset."
  ],
  "Faktoja Malmista": [
    "Malmi on vähän syrjemmällä, mutta ei liian kaukana keskustasta – about 10 kilsaa pohjoiseen.",
    "Alkoholi ja huumeet – osa arkea, ei tuomita, kaikki tekee omat juttunsa.",
    "Elämä menee omalla painollaan – ei ole kiirettä, kaikki tekee mitä tekee.",
	"Täällä on väkeä noin 24 860, eli ei mikään pikkupaikka, mutta ei myöskään ruuhkainen keskusta.",
	"Malmin asema on iso juttu, junat vie keskustaan tosi nopeesti.",
	"Malmin tori – tänne pääsee aina vähän sumeena, mutta ei se haittaa. Täällä on aina joku juttu, mitä etsit, vaikka et ihan tietäisikään mitä. Ehkä löytää muutaman halvan tölkin tai sen kahvin, joka maistuu kuin aurinko olis jäänyt pohjaan, mutta menee kuitenkin alas.",
	"Malmin baari-ilta – täällä voi joskus kuulla legendaarisia juttuja, joilla on vähän huonot loppuratkaisut mutta aivan huikea alku. Malmilla on oma tapa pitää hauskaa – ei se aina mene suunnitelmien mukaan, mutta aina se menee."
	"Luck Lady – Jos et ole koskaan käynyt Luck Ladyssä, et ole oikeasti kokenut Malmin ykköspaikkoja. Täällä voi törmätä kaveriin, jonka kanssa ei ole puhuttu vuoteen, ja seuraavana hetkenä olla karaokessa laulamassa 80-luvun hittejä. Vähän kuin vanhan koulun kapakka, mutta silti elävä ja hauska.",
	"Crazy Horse – Okei, jos etsit paikkaa, jossa meno ei lopu, niin Crazy Horse on se, jossa fiilis on korkealla. Täällä voi törmätä tyyppeihin, jotka nauttii elämästään yhtä villisti kuin nimenkin perusteella voisi kuvitella. Vähän rosoinen, mutta rehellinen – ja aina naurua riittää.",
	"Konja – Konja on se paikka, jossa voi juoda ja jutella, eikä kukaan kyseenalaista, jos vähän viivytkin pidempään. Ei kiirettä, ei häslinkiä – täällä vaan on hyvä olla ja nauttia hetkestä, vähän kuten hyvän baarin kuuluukin olla.",
	"Tissibaari – Tissibaari... no, nimi kertoo jo jotain. Tämä on se paikka, jossa naurua ja naurattavia tilanteita ei puutu. Vähemmän hienostelua, enemmän perinteistä Malmin meininkiä. Jos et ota itseäsi liian vakavasti, nautit tästä paikasta.",
	"Tillikka – Täällä voi istua ihan rauhassa ja nauttia, ja vieläpä löytää paikallisia, jotka ovat valmiita jakamaan elämän viisauksiaan – ja ehkä vähän juomansakin. Tillikka on vähän kuin se tutun oloinen baari, johon et ehkä aluksi usko, mutta kun astut sisään, et haluakaan lähteä.",
	"Suski – Suski on se mukava ja tutun oloinen paikka, jossa aina joku tuntee jonkun. Siinä ei ole mitään kummallista, mutta se ei olekaan tarpeen – täällä mennään fiiliksellä, ja illasta tulee helposti sellainen, jota et ollut edes suunnitellut, mutta nautit silti ihan täysillä.",
	"King Bar Restaurant – Tässä yhdistyy perinteinen baari ja ravintola, mutta ihan omalla twistillä. Jos haluat ottaa vähän ruokaa ja juomaa rennosti samalla, King Bar on oikea valinta. Ei liian hieno, mutta ei liian ronskikaan – juuri sopiva, jos haluat illan, joka ei ole ihan perus baari-ilta.",
	"Ekes – Ekes on se pienempi ja intiimimpi paikka, mutta silti juuri se oikea fiilis, jos haluat olla vähän omassa kuplassasi. Ei turhaa hälinää, vaan rauhallinen paikka, jossa voi keskustella ja nauttia, ilman että pitää huutaa toista korvaan."
	
	
	
  ]
};

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleQuestion = (question) => {
    setMessage(question);
    // Valitaan satunnainen vastaus
    const randomResponse = responses[question][Math.floor(Math.random() * responses[question].length)];
    setResponse(randomResponse);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <Card className="w-full max-w-md p-6 bg-white shadow-2xl rounded-3xl transform transition-all hover:scale-105">
        <CardContent>
          <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-4">Malmin Kuningatar</h2>
          <p className="text-gray-600 text-center mb-6">Kysy minulta jotain ja löydä Malmin salaisuudet!</p>

          <div className="flex flex-col space-y-4 mb-6">
            {Object.keys(responses).map((question) => (
              <Button
                key={question}
                onClick={() => handleQuestion(question)}
                className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all"
              >
                {question}
              </Button>
            ))}
          </div>

          {message && (
            <div className="mt-6 p-4 bg-gray-100 rounded-xl shadow-lg transform transition-all hover:scale-105">
              <p className="text-lg font-semibold text-gray-800 mb-2">{message}</p>
              <p className="text-gray-600">{response}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
