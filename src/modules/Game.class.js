'use strict';

class Game {
  constructor(initialState) {
    this.size = 4;
    this.score = 0;
    this.status = 'idle';
    this.board = initialState || this.createEmptyBoard();
    this.emptyCells = this.getEmptyCells();

    if (!initialState) {
      this.addRandomTile();
      this.addRandomTile();
    }
  }

  // Tworzy pustą planszę
  createEmptyBoard() {
    return Array.from({ length: this.size }, () => Array(this.size).fill(0));
  }

  // Rozpoczęcie gry
  start() {
    if (this.status === 'idle') {
      this.board = this.createEmptyBoard();
      this.score = 0;
      this.addRandomTile();
      this.addRandomTile();
      this.status = 'playing';
    }
  }

  // Restart gry
  restart() {
    this.board = this.createEmptyBoard();
    this.score = 0;
    this.emptyCells = this.getEmptyCells();
    this.addRandomTile();
    this.addRandomTile();
    this.status = 'playing';
  }

  // Pobiera aktualny stan gry
  getState() {
    return this.board;
  }

  getScore() {
    return this.score;
  }

  getStatus() {
    return this.status;
  }

  // Znajduje wszystkie puste komórki
  getEmptyCells() {
    const emptyCells = [];

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j] === 0) {
          emptyCells.push({ row: i, col: j });
        }
      }
    }

    return emptyCells;
  }

  // Dodaje losowy kafelek na planszy
  addRandomTile() {
    if (this.emptyCells.length === 0) {
      return;
    }

    const { row, col } =
      this.emptyCells[Math.floor(Math.random() * this.emptyCells.length)];

    this.board[row][col] = Math.random() < 0.9 ? 2 : 4;

    this.emptyCells = this.emptyCells.filter(
      (cell) => !(cell.row === row && cell.col === col),
    );
  }

  // Funkcja odpowiadająca za ruch kafelków
  move(direction) {
    let hasChanged = false;

    for (let i = 0; i < this.size; i++) {
      let currentRow = this.board[i].filter((value) => value !== 0);

      // Sprawdzenie i łączenie takich samych wartości
      for (let j = 0; j < currentRow.length - 1; j++) {
        if (currentRow[j] === currentRow[j + 1]) {
          currentRow[j] *= 2;
          this.increaseScore(currentRow[j]);
          currentRow[j + 1] = 0;
          j++; // Pomijamy już połączony kafelek
        }
      }

      currentRow = currentRow.filter((value) => value !== 0);

      // Uzupełnianie zerami na końcu
      while (currentRow.length < this.size) {
        currentRow.push(0);
      }

      if (!this.arraysEqual(this.board[i], currentRow)) {
        hasChanged = true;
        this.board[i] = currentRow;
      }
    }

    if (hasChanged) {
      this.addRandomTile();
      this.updateStatus();
    }
  }

  moveLeft() {
    if (this.status !== 'playing') {
      return;
    }
    this.move('left');
  }

  moveRight() {
    if (this.status !== 'playing') {
      return;
    }
    this.board = this.board.map((row) => row.reverse());
    this.move('right');
    this.board = this.board.map((row) => row.reverse());
  }

  moveUp() {
    if (this.status !== 'playing') {
      return;
    }
    this.board = this.transpose(this.board);
    this.move('up');
    this.board = this.transpose(this.board);
  }

  moveDown() {
    if (this.status !== 'playing') {
      return;
    }
    this.board = this.transpose(this.board);
    this.move('down');
    this.board = this.transpose(this.board);
  }

  // Obraca planszę
  transpose(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
  }

  // Sprawdzanie, czy dwie tablice są równe
  arraysEqual(a, b) {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }

  // Zwiększanie wyniku
  increaseScore(points) {
    this.score += points;
  }

  // Aktualizacja statusu gry
  updateStatus() {
    if (this.hasWon()) {
      this.status = 'win';
    } else if (!this.canMove()) {
      this.status = 'lose';
    }
  }

  // Sprawdza, czy gracz wygrał (osiągnął 2048)
  hasWon() {
    return this.board.some((row) => row.includes(2048));
  }

  // Sprawdza, czy można wykonać ruch
  canMove() {
    if (this.board.some((row) => row.includes(0))) {
      return true;
    }

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const current = this.board[i][j];

        if (
          (j < this.size - 1 && current === this.board[i][j + 1]) ||
          (i < this.size - 1 && current === this.board[i + 1][j])
        ) {
          return true;
        }
      }
    }

    return false;
  }
}

module.exports = Game;
