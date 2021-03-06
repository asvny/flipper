# Flipper 

> Flipper is a game of lights. It consists of a grid of lights, in which random lights are turned ON. The gameplay is to turn ON all the grid lights. On pressing a grid, it will toggle the current and neighboring four grid lights. The best score is based on the timing and the minimal number of moves. The complexity of the app increases as you advance each range of levels by incrementing the number of grids.

<p float="left">
  <img src="https://raw.githubusercontent.com/asvny/flipper/master/screenshots/home-screen.png" width="49%" />
  <img src="https://raw.githubusercontent.com/asvny/flipper/master/screenshots/game-screen.png" width="49%" /> 
</p>

# Description
The game starts with a random number of grids of lights, in which certain lights are switched ON. On pressing a grid, the pressed grid is flipped to either ON or OFF based on the current state and the bordering grids are also toggled depending on the current state of the grid. The aim of this game to turn off all the lights and finish it preferably with fewer moves or in a short span of time based on the difficulty. To keep the number of moves minimal, there are certain things to be kept in your mind, on pressing the same grid even number of times leaves the game in the same state.

# Features
- The app  has about 20 levels to squeeze your brain for solutions !.
- The app calculates the best score on the minimum number of moves taken to complete the level.
- Interactive UI with animations.
- The app allows the user to play any level randomly.
- The app keeps track of each screen with location hash.
- The difficulty increases as the level number increases.
- Handles all possible error states.

# Code
The code flows **MVC** pattern. The app uses a namespace named ** Flipper** which has the views, model and controller.
There is a additional section **template** which holds the DOM structure required for each screen.

## Controller
Responsible for the connecting model and view

## Templates
It has the DOM structure for the all the screens built using the DOM builder

## Model
It has the whole state of the app in a single object. It has complex objects and arrays nested within each other.

## View
It is responsible for click handlers and changes the model state based on the gameplay and navigates the user to appropriate screen

## Utils
Simple reusuable functionality for the app

# Author
Annamalai Saravanan