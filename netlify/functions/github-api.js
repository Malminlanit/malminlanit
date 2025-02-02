// netlify/functions/github-api.js
import fetch from 'node-fetch';

exports.handler = async function(event, context) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_OWNER = 'Malminlanit';
  const REPO_NAME = 'malminlanit';
  const FILE_PATH = 'public/schelude.json';

  try {
    const response = await fetch(
      `https://api.github.com/repos/Malminlanit/malminlanit/public/schelude.json}`,
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
