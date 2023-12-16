// Import necessary classes and resources
import Game from '../engine/game.js';
import Player from './player.js';
import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import MovingPlatform from './movingPlatform.js';
import Collectible from './collectible.js';
import Ladder from './ladder.js';

// Define a class Level that extends the Game class from the engine
class Level extends Game {
  
  // Define the constructor for this class, which takes one argument for the canvas ID
  constructor(canvasId) {
    // Call the constructor of the superclass (Game) with the canvas ID
    super(canvasId);

    // Create a ladder and add it to the game
    this.addGameObject(new Ladder(3 * (200 + 150), 0, this.canvas.height));

    // Create a player object and add it to the game
    //this.canvas.width / 2 - 25
    const player = new Player(0, this.canvas.height / 2 - 25);
    this.addGameObject(player);
    
    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));

    // Set the game's camera target to the player
    this.camera.target = player;

    // Define the platform's width and the gap between platforms
    const platformWidth = 200;
    const gap = 150;

    // Create platforms and add them to the game
    /*const platforms = [
      new Platform(0, this.canvas.height - 20, platformWidth, 20),
      new Platform(platformWidth + gap, this.canvas.height - 20, platformWidth, 20),
      new Platform(2 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20),
      new Platform(3 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20),
      new Platform(4 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20, 'vertical'),
    ];
    for (const platform of platforms) {
      this.addGameObject(platform);
    }*/

    //a lot of experimentation to try and get platforms moving
    this.addGameObject(new Platform(0, this.canvas.height - 20, platformWidth + 50, 20));
    this.addGameObject(new Platform(platformWidth + gap, this.canvas.height - 150, platformWidth + 180, 20));
    this.addGameObject(new Platform(platformWidth + gap, this.canvas.height + 100, platformWidth - 180, 20));
    this.addGameObject(new Platform(platformWidth + gap + gap + 50, this.canvas.height + 100, platformWidth - 180, 20));
    this.addGameObject(new Platform(platformWidth + gap + gap * 2 + 75, this.canvas.height + 100, platformWidth - 180, 20));
    this.addGameObject(new Platform(3 * (platformWidth + gap) - 100, this.canvas.height - 20, platformWidth + 50, 20));

    this.addGameObject(new Platform(platformWidth + gap + 100, this.canvas.height - 400, platformWidth - 180, 20));
    this.addGameObject(new Platform(platformWidth + gap + gap + 100, this.canvas.height - 400, platformWidth - 180, 20));
    this.addGameObject(new Platform(platformWidth + gap + gap * 2 + 250, this.canvas.height - 400, platformWidth - 180, 20));
    //this.addGameObject(new MovingPlatform(4 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20));

    // Create enemies and add them to the game
    // Temporarily and maybe completely disabling enemies
    this.addGameObject(new Enemy(platformWidth + gap, this.canvas.height - 150));
    //this.addGameObject(new Enemy(platformWidth + gap + 50, this.canvas.height - 90));
    //this.addGameObject(new Enemy(2 * (platformWidth + gap) + 50, this.canvas.height - 90));

    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(platformWidth + gap + gap + 52, this.canvas.height + 60, 15, 15));
    this.addGameObject(new Collectible(platformWidth + gap + gap + 52 - 15, this.canvas.height - 190, 20, 20));
    //this.addGameObject(new Collectible(650, this.canvas.height - 100, 20, 20));

  }
  
}

// Export the Level class as the default export of this module
export default Level;
