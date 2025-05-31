import { Application, Ticker } from "pixi.js";
import { AssetLoader } from "./asset-loader";
import { Keyboard } from "../input/keyboard";
import { Mouse } from "../input/mouse";
import { Player } from "../player/player";

/*
  This is our main class. This class represents the game itself.
*/
export class Game {
  private app: Application; // PIXI.Application is pixi's way to manage the game loop and rendering

  private player: Player; // The player object which we created

  constructor() {
    this.app = new Application(); // Create a new PIXI application instance

    AssetLoader.setOnAssetsLoaded(this.onAssetsLoaded.bind(this)); // Set the render method to be called when assets are loaded
  }

  /*
    This method initializes the game.
    It sets up the PIXI application, loads assets, and starts the game loop.
  */
  async start() {
    /*
      We initialitze the PIXI application with a resizeTo option
      to make it be the same size as the browser window
    */
    await this.app.init({
      resizeTo: window,
      background: 0xaaccff,
    });

    // document.body is the main HTML element of the page, and we append the PIXI canvas to it
    document.body.appendChild(this.app.canvas);

    /*
      We call our AssetLoader to load all the assets we need for the game,
      we need await because loadAssets function is asynchronous
    */
    await AssetLoader.getInstance().loadAssets();

    // ticker is PIXI's way to manage the game loop, we just add our update to PIXI's game loop
    this.app.ticker.add(this.update.bind(this));
  }

  // This method is called every frame by the PIXI ticker, it is what actually runs the game
  private update(ticker: Ticker) {
    this.player.update(); // Update the player

    // Update keyboard and mouse at the end of the frame
    Keyboard.getInstance().update();
    Mouse.getInstance().update();
  }

  private render() {
    // Render the player sprite to the stage, stage is the main container in PIXI where everything is rendered
    this.player.render(this.app.stage);
  }

  private onAssetsLoaded() {
    /*
      We can create the player only when asset are loaded,
      because in the player constructor we try to create a sprite with a texture from AssetLoader,
      which won't be possible if assets aren't loaded.
    */
    this.player = new Player(100, 100); // Create a new player instance at position (100, 100)
    this.render(); // Render everything
  }
}
