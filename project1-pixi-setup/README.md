# 🎮 PIXI.js Game Starter

A quick tutorial on setting up a clean, scalable game project with **[PIXI.js](https://pixijs.com/)**. All code is well-commented to help you understand the basics.

---

## 🚀 Setup Guide

### 1. Initialize Project

```bash
npm init -y
npm install pixi.js
npm install --save-dev vite
```

### 2. Basic Files

- `index.html` with a script tag for `/src/main/main.ts`

- `styles.css` for any UI

- Project folders:

```
public/   # Images, spritesheets
src/      # Game source code
├── main/ main.ts, game.ts, asset-loader.ts
├── input/ keyboard.ts, mouse.ts
└── player/ player.ts
```

## 🧠 Core Structure

- `Game`: main game class, manages loop and state

- `AssetLoader`, `Keyboard`, `Mouse`: singletons for input/assets

- `Player`: handles player movement and rendering

Each class is modular and has clear responsibilities.

## 🏃‍♂️ Run It

```bash
npx vite
```

### ✅ Tips

- Use removeFromParent() before addChild() to avoid duplicates

- Call update() every frame for logic; render() only when attaching sprites

- Check assets are loaded before using them — undefined textures = invisible sprites
