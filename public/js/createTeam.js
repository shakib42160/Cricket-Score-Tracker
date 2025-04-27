const createTeamHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#team-name').value.trim();
  const shortName = document.querySelector('#team-short-name').value.trim();

  if (name && shortName) {
    const response = await fetch('/api/teams', {
      method: 'POST',
      body: JSON.stringify({ name, short_name: shortName }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create team.');
    }
  }
};

document.querySelector('#create-team-form').addEventListener('submit', createTeamHandler);
