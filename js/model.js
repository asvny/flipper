/**
  This object holds the app in a single object which is used while rendering the screen to the user
*/
Flipper.Model = {
  // Extract the screen name from the hash 
  get currentScreen() {
    let levelCheck = this.currentHash.match(/level-([0-9]+)/);

    if (levelCheck) return "level";

    return this.currentHash.slice(1);
  },

  // The URL location hash
  currentHash: "#home",

  // The current level the user is playing
  currentLevel: 1,

  // The moves made by the user for each level to finish it
  moves: 0,

  // A hash used to store the high scores 
  scores: {},

  // Alias for gameLevels within the Model object
  gameLevels: window.gameLevels,

  // Get the cloned copy of the array from gameLevels which is used for gameplay
  // We clone it, because arrays mutate when changing the data.
  setBoard() {
    this.board = Utils.clone(this.gameLevels.levels[this.currentLevel - 1]);
  },

  // Returns the current level board
  get currentGrid() {
    return this.board;
  },

  // It is util function used for toggling the neighbouring grid cells
  flip(i, j) {
    let length = this.board[0].length - 1;

    if (i >= 0 && i <= length && j >= 0 && j <= length) {
      this.board[i][j] = this.board[i][j] === 1 ? 0 : 1;
    }
  },

  // A method used which is flips the nearby cells by calling with their indexes in the array
  flipGrid(i, j) {
    this.flip(i, j);
    this.flip(i + 1, j);
    this.flip(i - 1, j);
    this.flip(i, j + 1);
    this.flip(i, j - 1);
  },

  // It returns a boolean if the current level is in WIN state, if WON all the values should be 0
  // i.e., The user has turned on all the lights.
  get hasWon() {
    return this.board.every(row => row.every(cell => cell === 0));
  }
};
