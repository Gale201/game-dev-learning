/*
  This is also a singleton class (go to asset-loader.ts to see how to implement a singleton class).
  This class is responsible for handling keyboard input.
  It listens for keydown and keyup events and keeps track of the state of each key.
*/

export class Keyboard {
  private static instance: Keyboard; // Singleton instance of Keyboard

  // Maps to keep track of key states
  private pressed: Map<string, boolean>; // Stores all keys that are currently pressed
  private justPressed: Map<string, boolean>; // Stores keys that were just pressed this frame
  private justReleased: Map<string, boolean>; // Stores keys that were just released this frame

  private constructor() {
    if (Keyboard.instance) {
      throw new Error(
        "Keyboard instance already exists. Use Keyboard.getInstance() instead."
      );
    }

    // Add event listeners for keydown and keyup events
    this.addEventListeners();

    // Initialize maps to track key states
    this.pressed = new Map<string, boolean>();
    this.justPressed = new Map<string, boolean>();
    this.justReleased = new Map<string, boolean>();
  }

  // This method is called every frame to reset the state of the justPressed and justReleased keys
  update() {
    for (const key of Object.keys(this.justPressed)) {
      this.justPressed[key] = false;
    }
    for (const key of Object.keys(this.justReleased)) {
      this.justReleased[key] = false;
    }
  }

  // window.addEventListener is used to listen for keydown and keyup events in the browser
  addEventListeners() {
    /* 
      When keydown event occurs, the browser will call the this.downHandler method.
      We need to add .bind(this) to the method to ensure that 'this' inside the method refers to the Keyboard instance.
    */
    window.addEventListener("keydown", this.downHandler.bind(this), false);
    window.addEventListener("keyup", this.upHandler.bind(this), false);
  }

  // This method removes the event listeners for keydown and keyup events
  removeEventListeners() {
    window.removeEventListener("keydown", this.downHandler);
    window.removeEventListener("keyup", this.upHandler);
  }

  // These methods handle the keydown and keyup events

  private downHandler(event: KeyboardEvent) {
    if (this.pressed[event.key]) return;

    this.pressed[event.key] = true;
    this.justPressed[event.key] = true;
    this.justReleased[event.key] = false;
  }

  private upHandler(event: KeyboardEvent) {
    this.pressed[event.key] = false;
    this.justPressed[event.key] = false;
    this.justReleased[event.key] = true;
  }

  /*
    Functions to check the state of keys, 
    these functions exist to provide a simple interface for checking key states.
  */

  isKeyPressed(key: string): boolean {
    return this.pressed[key];
  }

  isKeyJustPressed(key: string): boolean {
    return this.justPressed[key];
  }

  isKeyJustReleased(key: string): boolean {
    return this.justReleased[key];
  }

  // Singleton pattern implementation
  static getInstance() {
    if (!Keyboard.instance) {
      Keyboard.instance = new Keyboard();
    }
    return Keyboard.instance;
  }
}
