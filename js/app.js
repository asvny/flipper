// Set Flipper as the parent prototype for both View and Controller
Object.setPrototypeOf(Flipper.View, Flipper);
Object.setPrototypeOf(Flipper.Controller, Flipper);

/**
  Get the previously stored score from localstorage and set in the app' model
*/
let score = localStorage.getItem("score");
Flipper.Model.scores = score != null ? JSON.parse(score) : {};


/**
  This is event handler which fires whenever the location's hash changes
  Each screen in the app has its own unique hash
  For eg.,
    home  -> #home
    level -> #level-0
    about -> #about

    So whenever the hash changes we listen for it and pass on the data for the controller to handle it.
*/
function hashChangeHandler(event) {
  let currentHash = window.location.hash;

  if (!currentHash) {
    currentHash = window.location.hash = Flipper.Model.currentHash;
  }

  Flipper.Model.currentHash = window.location.hash;
  Flipper.Controller.handleEvent();
}

/**
  This is event handler which listens form orientation change event.
  This app doesn't support landscape mode, so we notify the user with a message when he/she changes orientation.
*/
function orientationHanlder() {
  // We get the current orientation type here 
	let type = screen.orientation.type;
	let isLandscape = type.includes('landscape');
  let lessHeight = screen.availHeight < 720 ? true : false;
	let method = (lessHeight && isLandscape) ? 'add' : 'remove';

  // Based on the isLandscape value or minimum height, we add or remove "show" class
	$('.Notify').classList[method]('show');
}

window.addEventListener("orientationchange", orientationHanlder);
window.addEventListener("hashchange", hashChangeHandler);

// Start off the app with the home screen as the main one
window.location.hash = Flipper.Model.currentHash;

// Trigger the controller for initial start which is responsible for showing/hiding screen states
Flipper.Controller.handleEvent();


