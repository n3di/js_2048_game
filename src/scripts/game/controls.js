export function setupKeyboardControls(game, updateUI) {
  document.addEventListener('keydown', (e) => {
    const directionMap = {
      ArrowLeft: 'left',
      ArrowRight: 'right',
      ArrowUp: 'up',
      ArrowDown: 'down',
    };
    const direction = directionMap[e.key];

    if (direction) {
      moveTiles(game, direction, updateUI);
    }
  });
}

export function setupTouchEvents(game, updateUI) {
  const gridContainer = document.querySelector('.grid-container');
  let touchStartX = 0;
  let touchStartY = 0;

  gridContainer.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    },
    false,
  );

  gridContainer.addEventListener(
    'touchend',
    (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;

      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          moveTiles(game, 'right', updateUI);
        } else {
          moveTiles(game, 'left', updateUI);
        }
      } else {
        if (diffY > 0) {
          moveTiles(game, 'down', updateUI);
        } else {
          moveTiles(game, 'up', updateUI);
        }
      }
    },
    false,
  );
}

function moveTiles(game, direction, updateUI) {
  switch (direction) {
    case 'left':
      game.moveLeft();
      break;
    case 'right':
      game.moveRight();
      break;
    case 'up':
      game.moveUp();
      break;
    case 'down':
      game.moveDown();
      break;
  }
  updateUI();
}
