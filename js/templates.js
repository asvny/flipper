/**
  Each method in the templates denotes a screen, it has the DOM structure required build using dom-builder util
  The method takes model as input and based on the state returns the dom elements
*/
Flipper.Templates = {
  // UI for home screen which is simple with a list of buttons
  home(model) {
    return D.div(
      { "data-screen": "home", class: "Home" },
      D.div({ class: "Home-Logo" }, "F"),
      D.button({ class: "Button Home--btn js-new-game" }, "New Game"),
      D.button({ class: "Button Home--btn js-select-level" }, "Select Level"),
      D.button({ class: "Button Home--btn js-about" }, "About"),
      D.button({ class: "Button Home--btn js-scores" }, "High Scores"),
      D.footer({ class: "Home-Footer" }, "Flipper Inc. v2.0")
    );
  },

  // UI for all the level screens
  level(model) {
    let { currentLevel, currentGrid, moves } = model;

    // Map and build the grid cells based on the current level 
    let li = currentGrid.map((level, i) => {
      return level.map((grid, j) => {
        let activeClass = currentGrid[i][j] ? "" : "active";
        return D.li({
          class: `Level-gridCell js-cell ${activeClass}`,
          "data-i": i,
          "data-j": j
        });
      });
    });

    let flattenLi = Utils.flatten(li);

    // Builds the DOM with the list of grids and menus for the main screen
    return D.div(
      { "data-screen": "level", class: "Level" },
      D.h1({ class: "Level-heading" }, `Level ${currentLevel}`),
      D.ul({ class: "Level-gameGrid" }, ...flattenLi),
      D.nav(
        { class: "Level-nav" },
        D.button({ class: "Level-navItem js-home" }, D.span({}, "Home")),
        D.div({ class: "Level-score" }, D.span({}, moves), D.i({}, "Moves")),
        D.button({ class: "Level-navItem js-reset" }, D.span({}, "Reset"))
      )
    );
  },

  // UI for about screen with the description
  about(model) {
    return D.div(
      { "data-screen": "about", class: "About" },
      D.h1({}, "Flipper"),
      D.p(
        {},
        "Flipper is a game of lights. It consists of a grid of lights, in which random lights are turned ON. The gameplay is to turn ON all the grid lights. On pressing a grid, it will toggle the current and neighboring four grid lights. The best score is based on the timing and the minimal number of moves. The complexity of the app increases as you advance each range of levels by incrementing the number of grids. The score is caculated based on the minimal number of moves taken to finish the level."
      ),
      D.button({ class: "Button Home--btn js-play" }, "Start Play !"),
      D.span({ class: "About-or" }, "or"),
      D.button({ class: "About-homeBtn js-home" }, "Go home")
    );
  },

  // UI for select screen which displays all the levels
  selectLevel(model) {
    let levels = model.gameLevels.levels.map((_, i) => {
      return D.li(
        { "data-level": i },
        D.button({ class: "Button" }, Number(i) + 1)
      );
    });

    return D.div(
      { "data-screen": "selectLevel", class: "SelectLevel" },
      D.h1({}, "Select Level"),
      D.ul({ class: "js-grid" }, ...levels),
      D.button({ class: "SelectLevel-homeBtn js-home" }, "Go home")
    );
  },

};


// A function to render a screen in the browser which calls the specific screen method in the templates objects with
// a model 
Flipper.render = screen => model => {
  return Flipper.Templates[screen](model);
};