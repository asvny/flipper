/**
  Views has methods for each screen which is responsible for listening and events and also handling the UI logic
  It has lots of other methods for additionally functionality.
*/
Flipper.View = {
  // navigate the page to a specific page based on parameters.
  navigate(screen) {
    window.location.hash = "#" + screen;
  },

  // Show the current screen based on state
  show() {
    let { currentScreen } = Flipper.Model;

    let template = this.render(currentScreen)(Flipper.Model);
    this.app.appendChild(template);
  },

  // Hides the previous screen
  hide() {
    let screen = $(`[data-screen]`);
    screen.remove();
  },

  // Listens for click events and navigates to their repsective pages.
  home() {
    let newGameBtn = $(".js-new-game");
    let aboutBtn = $(".js-about");
    let selectLevelBtn = $(".js-select-level");
    let viewScores = $(".js-scores");

    let newGameHandler = event => {
      this.navigate("level-1");
      Flipper.Model.currentLevel = 1;
    };

    let aboutHandler = event => {
      this.navigate("about");
    };

    let selectLevelBtnHandler = event => {
      this.navigate("selectLevel");
    };

    let scoreHandler = event => {
      this.navigate("viewScores");
    };

    selectLevelBtn.addEventListener("click", selectLevelBtnHandler);
    aboutBtn.addEventListener("click", aboutHandler);
    newGameBtn.addEventListener("click", newGameHandler);
    viewScores.addEventListener("click", scoreHandler);
  },

  // Displays description 
  about() {
    let startPlay = $(".js-play");
    let homeBtn = $(".js-home");

    this.startPlayHandler = event => {
      this.Model.moves = 0;
      this.Model.currentLevel = 1;
      this.navigate("level-1");
    };

    this.homeHandler = event => {
      this.navigate("home");
    };

    homeBtn.addEventListener("click", this.homeHandler);
    startPlay.addEventListener("click", this.startPlayHandler);
  },

  //  Renders the grid for each level
  _renderGrid() {
    let gameGrid = $(".Level-gameGrid");
    let resetBtn = $(".js-reset");
    let homeBtn = $(".js-home");

    gameGrid.removeEventListener("click", this.gameGridHandler);
    resetBtn.removeEventListener("click", this.resetHandler);
    homeBtn.removeEventListener("click", this.homeHandler);

    this.hide();
    this.show();
    this.level();
  },

  // handles the win state, click events for each cell and navigation to home, reset the board
  level() {
    let gameGrid = $(".Level-gameGrid");
    let resetBtn = $(".js-reset");
    let homeBtn = $(".js-home");

    $('[data-screen]').classList.add('no-animation');

    this.gameGridHandler = event => {
      if (!event.target.classList.contains("js-cell")) {
        return;
      }
      // Get i, j indexes which helps to access the model board array
      let { i, j } = event.target.dataset;

      // Increment the moves
      this.Model.moves++;

      // Flip the neighbouring grid cells
      this.Model.flipGrid(Number(i), Number(j));

      // Render the grids cell alone
      this._renderGrid();

      // Check for win state
      if (this.Model.hasWon) {
        console.log("Won !");

        let { currentLevel, moves, scores } = Flipper.Model;

        // If the score is the best than previous, store it.
        let levelScore = scores["level-" + currentLevel];
        if (levelScore == null || moves < levelScore) {
          scores["level-" + currentLevel] = moves;
          localStorage.setItem("scores", JSON.stringify(scores));
        }

        // Show the WIN state popup and hide it after a certain time
        setTimeout(_ => {
          $(".js-level").innerHTML = `Level ${this.Model.currentLevel}`;
          $(".Success").classList.add("show");

          setTimeout(_ => {
            $(".Success").classList.remove("show");
            this.Model.moves = 0;

            let nextLevel = Number(this.Model.currentLevel) + 1;
            this.navigate("level-" + nextLevel);
          }, 2000);
        }, 750);
      }
    };

    this.resetHandler = event => {
      this.Model.moves = 0;
      this.navigate(window.location.hash);
    };

    this.homeHandler = event => {
      this.navigate("home");
    };

    homeBtn.addEventListener("click", this.homeHandler);
    resetBtn.addEventListener("click", this.resetHandler);
    gameGrid.addEventListener("click", this.gameGridHandler);
  },

  // Listens for click and navigates to the respective level.
  selectLevel() {
    let grid = $(".js-grid");
    let homeBtn = $(".js-home");

    this.gridHandler = event => {
      if (!event.target.tagName === "button") return;

      let level = Number(event.target.parentNode.dataset.level) + 1;

      this.Model.moves = 0;
      this.Model.currentLevel = level;
      this.navigate("level-" + level);
    };

    this.homeHandler = event => {
      this.navigate("home");
    };

    homeBtn.addEventListener("click", this.homeHandler);
    grid.addEventListener("click", this.gridHandler);
  },

  //  Listen for home btn event and navigates to the home screen
  viewScores() {
    let homeBtn = $(".js-home");

    this.homeHandler = event => {
      this.navigate("home");
    };

    homeBtn.addEventListener("click", this.homeHandler);
  }
};
