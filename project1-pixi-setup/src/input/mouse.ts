/*
  This is also a singleton class (go to asset-loader.ts to see how to implement a singleton class).
  This class is responsible for handling mouse input.
  It listens for mousedown, mouseup, and mousemove events and keeps track of the state of each mouse button.
*/
export class Mouse {
  private static instance: Mouse; // Singleton instance of Mouse

  // Maps to keep track of mouse button states
  private pressed: Map<number, boolean>;
  private justPressed: Map<number, boolean>;
  private justReleased: Map<number, boolean>;

  // Current mouse position
  private x: number = 0;
  private y: number = 0;

  private constructor() {
    if (Mouse.instance) {
      throw new Error(
        "Keyboard instance already exists. Use Keyboard.getInstance() instead."
      );
    }

    // Add event listeners for mousedown, mouseup, and mousemove events
    this.addEventListeners();

    // Initialize maps to track button states
    this.pressed = new Map<number, boolean>();
    this.justPressed = new Map<number, boolean>();
    this.justReleased = new Map<number, boolean>();
  }

  // This method is called every frame to reset the state of the justPressed and justReleased buttons
  update() {
    for (const button in this.justPressed) {
      this.justPressed[button] = false;
    }
    for (const button in this.justReleased) {
      this.justReleased[button] = false;
    }
  }

  /*
    window.addEventListener is used to listen for mousedown, mouseup, and mousemove events in the browser.
    When these events occur, the browser will call the respective handler methods.
  */
  private addEventListeners() {
    window.addEventListener("mousedown", this.downHandler.bind(this));
    window.addEventListener("mouseup", this.upHandler.bind(this));
    window.addEventListener("mousemove", this.moveHandler.bind(this));
  }

  // These methods handle the mousedown, mouseup, and mousemove events

  private downHandler(event: MouseEvent): void {
    if (this.pressed[event.button]) return;

    this.pressed[event.button] = true;
    this.justPressed[event.button] = true;
    this.justReleased[event.button] = false;
  }

  private upHandler(event: MouseEvent): void {
    this.pressed[event.button] = false;
    this.justPressed[event.button] = false;
    this.justReleased[event.button] = true;
  }

  private moveHandler(event: MouseEvent): void {
    this.x = event.clientX;
    this.y = event.clientY;
  }

  /*
    Functions to check the state of buttons, 
    these functions exist to provide a simple interface for checking button states.
  */

  isPressed(button: number): boolean {
    return this.pressed[button];
  }

  isJustPressed(button: number): boolean {
    return this.justPressed[button];
  }

  isJustReleased(button: number): boolean {
    return this.justReleased[button];
  }

  getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  // Singleton pattern implementation
  static getInstance(): Mouse {
    if (!Mouse.instance) {
      Mouse.instance = new Mouse();
    }
    return Mouse.instance;
  }
}
