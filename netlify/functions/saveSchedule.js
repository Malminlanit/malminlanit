// netlify/functions/saveSchedule.js

exports.handler = async function(event, context) {
  // Tarkistetaan, että pyyntö on POST
  if (event.httpMethod === "POST") {
    const requestBody = JSON.parse(event.body);

    // Tallennetaan aikataulu (täällä voit toteuttaa haluamasi tallennuslogiikan, esim. tiedostoon tai tietokantaan)
    console.log("Aikataulu tallennettu:", requestBody.schedule);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Aikataulu tallennettu onnistuneesti!" }),
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Metodi ei ole sallittu" }),
  };
};
