import { Assets, DEPRECATED_SCALE_MODES, Texture } from "pixi.js";

/*
  This class is responsible for loading assets for the game.
  It is a singleton, meaning there can only be one instance of it.
  This is what all singleton classes should look like:

  class SingletonExample {
    private static instance: SingletonExample;  -> This is the only allowed instance of the class

    private constructor() {}  -> Notice it is private, so it cannot be instantiated from outside the class

    static getInstance(): SingletonExample {  -> This is the only way to get the instance of the class
      if (!SingletonExample.instance) {  -> if the instance does not exist, we create it
        SingletonExample.instance = new SingletonExample();
      }
      return SingletonExample.instance;  -> if the instance already exists, we return it
    }
*/
export class AssetLoader {
  private static instance: AssetLoader; // The only allowed instance of the class

  private onAssetsLoaded: () => void = () => {}; // Function to call when assets are loaded

  // Texture variables
  bacoIdleLeft: Texture;

  private constructor() {
    // If an instance already exists, throw an error to prevent multiple instances
    if (AssetLoader.instance) {
      throw new Error(
        "AssetLoader is a singleton and has already been instantiated."
      );
    }
  }

  // This method is called to load all the assets we need for the game.
  async loadAssets() {
    // Here we load all the assets we need for the game.
    this.bacoIdleLeft = await Assets.load("images/baco-idle-left.png");
    // Set the scale mode to nearest for pixel art, try with LINEAR if you want to see the difference
    this.bacoIdleLeft.source.scaleMode = DEPRECATED_SCALE_MODES.NEAREST;

    // After assets are loaded, we call the onAssetsLoaded function.
    this.onAssetsLoaded();
  }

  // Singleton pattern implementation
  static getInstance(): AssetLoader {
    if (!AssetLoader.instance) {
      AssetLoader.instance = new AssetLoader();
    }
    return AssetLoader.instance;
  }

  // This method allows us to set a function that will be called when the assets are loaded.
  static setOnAssetsLoaded(onAssetsLoaded: () => void): void {
    this.getInstance().onAssetsLoaded = onAssetsLoaded;
  }
}
