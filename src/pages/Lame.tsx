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
