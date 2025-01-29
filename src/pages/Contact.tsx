import React from 'react';

const Contact = () => {
  return (
    <div className="text-white text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Ohjeistuksia</h1>

      <h2 className="text-2xl font-semibold mb-4">Varusteet</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Tietokoneet:</strong> Pelissä ei ole sijaa heikolle koneelle. Vain nopeimmat ja kestävimmät koneet, jotka pystyvät käsittelemään Malmin sisäisen sähkön ja lohikäärmeenkokoisen pelivoiman, ovat sallittuja.</li>
        <li><strong>Näytöt:</strong> Valitse näyttö, joka kirkastuu niin, että Malmin pimeimmissäkin kulmissa se ohittaa auringonlaskun kirkkauden. Tarvitaan suuret ja terävät näytöt, jotka vievät syvälle peliin.</li>
        <li><strong>Verkkokaapelit:</strong> Varmista, että yhteydet pysyvät tukevina ja nopeina. Vahvat ja kestävät verkkokaapelit takaavat pelin sujuvuuden ilman katkoksia.</li>
        <li><strong>Peliohjaimet:</strong> Ohjaimet eivät ole vain välineitä, ne ovat jatke kädelle. Vain parhaat mestarit ymmärtävät niiden merkityksen ja käyttävät niitä kuin vanhat kivipolut Malmilla vievät jokaista askelta.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Säännöt ja käytännöt</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Päihteet:</strong> Pelissä ei ole sijaa humalalle. Vain maltilliset juomat ovat sallittuja, ja ne nautitaan yhteisön kokoontumisessa – sillä Malmin yhteisössä nautitaan naurusta, ei kaaoksesta.</li>
        <li><strong>Melu:</strong> Malmin sydämessä huudot eivät ole vain ääntä, vaan taistelukutsuja. Älä pelkää ilmaisemista, mutta muista, ettei pelissä ole tilaa häiriöille – huudot on suunniteltu voittamiseen, ei häiritsemiseen.</li>
        <li><strong>Siisteys:</strong> Malmi vaatii raikkaan ilman ja puhtaat pelitilat. Pidä ympäristösi siistinä, sillä epäjärjestys houkuttelee kaaosta – ja Malmilla ei ole tilaa turhalle sotkulle.</li>
        <li><strong>Tauot:</strong> Taukoja pidetään silloin, kun peli sitä vaatii. Malmilla ei kiirehditä, mutta jos peli ei etene, tauko on vain viivyttelyä – tasapaino on tärkeintä pelissä ja elämässä.</li>
      </ul>
    </div>
  );
};

export default Contact;
