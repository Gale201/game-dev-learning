/*
  This file is the entry point for the game. 
  When the user goes to our game's URL, index.html is loaded,
  which in turn loads this file.
*/

import { Game } from "./game";

/*
  This function initializes our game object and calls the start method on it. 
  It is asynchronous because we are going to load assets asynchronously
*/
async function startGame() {
  const game = new Game();
  game.start();
}

// Call the startGame function to kick off the game
startGame();
