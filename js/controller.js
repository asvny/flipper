Flipper.Controller = {};


Flipper.Controller.handleEvent = (hash = Flipper.Model.currentHash) => {
  let screen = hash.slice(1);
  // Extract the level number from hash
  let levelNumber = hash.match(/level-([0-9]+)/);

  let { View } = Flipper;

  // If levelNumber is present, start off with that level.
  if (levelNumber != null) {
    levelNumber = levelNumber[1];
    screen = "level";

    // Set the level in the model and set the grid board in the model.
    Flipper.Model.currentLevel = levelNumber;
    Flipper.Model.setBoard();
    document.documentElement.style.setProperty(
      "--Grid-size",
      Flipper.Model.board[0].length
    );
  }

  // If view is not present show an error message.
  if (!View.hasOwnProperty(screen)) {
    console.error(
      `${screen} screen is missing from the available list of screens`
    );
  }

  // If there is a previous screen ,hide it.
  let currentScreen = $("[data-screen]");
  if (currentScreen) {
    Flipper.View.hide();
  }

  // Show the current screen and call the function responsible for event handling for that view
  Flipper.View.show();
  Flipper.View[screen]();
};