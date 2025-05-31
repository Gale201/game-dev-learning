import { Container, Sprite } from "pixi.js";
import { Keyboard } from "../input/keyboard";
import { AssetLoader } from "../main/asset-loader";

export class Player {
  private x: number;
  private y: number;
  private readonly speed: number = 5;
  private sprite: Sprite;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.sprite = new Sprite(AssetLoader.getInstance().bacoIdleLeft);
    this.sprite.scale.set(3, 3); // Adjust the scale of the sprite as you want
  }

  // This method is called every frame, this is where we update the player
  update() {
    // Handle player movement logic here
    if (Keyboard.getInstance().isKeyPressed("ArrowLeft")) {
      this.x -= this.speed;
    }
    if (Keyboard.getInstance().isKeyPressed("ArrowRight")) {
      this.x += this.speed;
    }
    if (Keyboard.getInstance().isKeyPressed("ArrowUp")) {
      this.y -= this.speed;
    }
    if (Keyboard.getInstance().isKeyPressed("ArrowDown")) {
      this.y += this.speed;
    }

    this.sprite.position.set(this.x, this.y); // Update the sprite position to match the player position
  }

  /*
    This is where we render the player sprite to the screen.
    This method is called only once, because that is how PIXI works.
  */
  render(container: Container) {
    this.sprite.removeFromParent(); // This is just in case someone calls render multiple times

    container.addChild(this.sprite); // Adds the player sprite to the container specified
  }

  /*
    Always create getters!!! But dont create unnecessary getters, 
    only create getters for properties that are needed outside the class.
    For example, i will never need player sprite outside the player class,
    so i will not create a getter for it.
  */

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }
}
