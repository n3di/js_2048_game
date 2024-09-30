export function setupNewGameButton(game, updateUI) {
  const newGameButton = document.querySelector('.restart');

  newGameButton.addEventListener('click', () => {
    const userConfirmed = confirm(
      'Are you sure you want to start a new game? All progress will be lost.',
    );

    if (userConfirmed) {
      game.restart();
      updateUI();
    }
  });
}
