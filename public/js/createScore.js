const createScoreHandler = async (event) => {
  event.preventDefault();

  const playerId = document.querySelector('#player-id').value.trim();
  const matchId = document.querySelector('#match-id').value.trim();
  const runs = document.querySelector('#runs').value.trim();

  if (playerId && matchId && runs) {
    const response = await fetch('/api/scores', {
      method: 'POST',
      body: JSON.stringify({ player_id: playerId, match_id: matchId, runs }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create score.');
    }
  }
};

document.querySelector('#create-score-form').addEventListener('submit', createScoreHandler);
