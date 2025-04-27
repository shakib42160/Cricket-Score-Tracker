const createMatchHandler = async (event) => {
  event.preventDefault();

  const team1 = document.querySelector('#team1').value.trim();
  const team2 = document.querySelector('#team2').value.trim();
  const date = document.querySelector('#match-date').value;

  if (team1 && team2 && date) {
    const response = await fetch('/api/matches', {
      method: 'POST',
      body: JSON.stringify({ team1_id: team1, team2_id: team2, date }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create match.');
    }
  }
};

document.querySelector('#create-match-form').addEventListener('submit', createMatchHandler);
