// netlify/functions/github-api.js
const fetch = require('node-fetch'); // Tarvitset node-fetch-paketin

exports.handler = async function(event, context) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Käytä ympäristömuuttujaa
  const REPO_OWNER = 'Malminlanit'; // GitHubin käyttäjätunnus
  const REPO_NAME = 'malminlanit'; // Repositoryn nimi
  const FILE_PATH = 'public/schelude.json'; // Tiedoston polku

  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: 'Virhe GitHubin API:ssa' }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'API-kutsu epäonnistui', error: error.message }),
    };
  }
};
