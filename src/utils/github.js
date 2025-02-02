const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const REPO_OWNER = process.env.REACT_APP_GITHUB_USERNAME;
const REPO_NAME = process.env.REACT_APP_GITHUB_REPO;
const FILE_PATH = process.env.REACT_APP_FILE_PATH;

export const getFileSha = async () => {
  const user = netlifyIdentity.currentUser();
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      }
    );
    const data = await response.json();
    return data.sha;
  } catch (error) {
    console.error('Virhe tiedoston SHA:n hakemisessa:', error);
    return null;
  }
};

export const saveScheduleToGitHub = async (updatedData) => {
  const user = netlifyIdentity.currentUser();
  const fileContent = JSON.stringify(updatedData, null, 2);
  const base64Content = window.btoa(unescape(encodeURIComponent(fileContent)));

  const sha = await getFileSha();

  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Päivitetään aikataulu',
          content: base64Content,
          sha: sha || undefined,
        }),
      }
    );

    if (response.ok) {
      alert('Tiedot päivitetty GitHubiin!');
    } else {
      alert('Päivitys epäonnistui!');
    }
  } catch (error) {
    console.error('Virhe päivityksessä:', error);
    alert('Päivitys epäonnistui!');
  }
};
