export function updateUI(game) {
  const tileContainer = document.querySelector('.tile-container');
  const scoreElement = document.querySelector('.stats_score');
  const gridContainer = document.querySelector('.grid-container');
  const messageContainer = document.querySelector('.message-container');

  tileContainer.innerHTML = ''; // Czyścimy kontener kafelków

  const state = game.getState();

  state.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (value !== 0) {
        const tile = document.createElement('div');

        tile.classList.add('tile', `tile--${value}`);
        tile.textContent = value;

        const { xPos, yPos } = calculateTilePosition(
          rowIndex,
          colIndex,
          gridContainer,
        );

        tile.style.transform = `translate(${xPos}px, ${yPos}px)`;

        tileContainer.appendChild(tile);
      }
    });
  });

  scoreElement.textContent = game.getScore();

  const gameStatus = game.getStatus();

  if (gameStatus === 'win') {
    messageContainer.textContent = 'Congratulations, You Won!';
    messageContainer.classList.remove('hidden');
  } else if (gameStatus === 'lose') {
    messageContainer.textContent = 'Game Over! Try Again?';
  }
}

function calculateTilePosition(row, col, gridContainer) {
  const gridCells = document.querySelectorAll('.grid-cell');
  const gridCell = gridCells[0];
  const { width: cellWidth, height: cellHeight } =
    gridCell.getBoundingClientRect();
  const padding = parseFloat(
    window.getComputedStyle(gridContainer).paddingLeft,
  );

  const xPos = padding + col * (cellWidth + 10);
  const yPos = padding + row * (cellHeight + 10);

  return { xPos, yPos };
}
