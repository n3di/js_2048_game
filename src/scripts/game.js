import Game from '../modules/Game.class.js';
import { setupNewGameButton } from './game/game-setup.js';
import { updateUI } from './game/ui-update.js';
import { setupKeyboardControls, setupTouchEvents } from './game/controls.js';

const game = new Game();

// Inicjalizujemy grę
document.addEventListener('DOMContentLoaded', () => {
  setupNewGameButton(game, updateUI);
  setupKeyboardControls(game, updateUI);
  setupTouchEvents(game, updateUI);
  updateUI(game); // Uruchomienie UI przy starcie
});
