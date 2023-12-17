// Import necessary classes and resources
import Game from '../engine/game.js';
import Player from './player.js';
import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import MovingPlatform from './movingPlatform.js';
import Collectible from './collectible.js';
import Ladder from './ladder.js';
import UI from '../engine/ui.js';
import GameText from '../engine/gameText.js';
import Picture from './picture.js';
import {Images} from '../engine/resources.js';

// Define a class Level that extends the Game class from the engine
class Level extends Game {
  
  // Define the constructor for this class, which takes one argument for the canvas ID
  constructor(canvasId) {
    // Call the constructor of the superclass (Game) with the canvas ID
    super(canvasId);

    // background
    this.addGameObject(new Picture(-1500, -1500, this.canvas.width * 10, this.canvas.height * 10));

    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));

    //end game text thanks bob
    //this.addGameObject(new UI("You Win!", platformWidth - gap - 180, -500));
    this.addGameObject(new GameText("You Win!", -40, -600, "50px Arial", "white"));

    // after collecting all the collectibles
    this.addGameObject(new GameText("You Collected all the Collectables!", -300, -1100, "50px Arial", "white"));

    //easter egg
    this.addGameObject(new Picture(1550, this.canvas.height - 1200, 100, 100, Images.egg));

    // Create a ladder and add it to the game
    this.addGameObject(new Ladder(3 * (200 + 155), 0, this.canvas.height));

    // Create a player object and add it to the game
    //this.canvas.width / 2 - 25
    const player = new Player(0, this.canvas.height / 2 - 25);
    this.addGameObject(player);
    
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
    //start
    this.addGameObject(new Platform(0, this.canvas.height - 20, platformWidth + 50, 20));
    //platform with enemy
    this.addGameObject(new Platform(platformWidth + gap, this.canvas.height - 150, platformWidth + 180, 20));
    //tinies
    this.addGameObject(new Platform(platformWidth + gap, this.canvas.height + 100, platformWidth - 180, 20));
    this.addGameObject(new Platform(platformWidth + gap + gap + 50, this.canvas.height + 100, platformWidth - 180, 20));
    this.addGameObject(new Platform(platformWidth + gap + gap * 2 + 75, this.canvas.height + 100, platformWidth - 180, 20));
    //platform with ladder
    this.addGameObject(new Platform(3 * (platformWidth + gap) - 100, this.canvas.height - 20, platformWidth + 50, 20));

    //tinies after ladder
    this.addGameObject(new Platform(platformWidth + gap + 100, this.canvas.height - 400, platformWidth - 180, 20));
    this.addGameObject(new Platform(platformWidth + gap + gap + 100, this.canvas.height - 400, platformWidth - 180, 20));
    this.addGameObject(new Platform(platformWidth + gap + gap * 2 + 250, this.canvas.height - 400, platformWidth - 180, 20));
    
    // The Moving platforms
    // vertical
    this.addGameObject(new MovingPlatform(4 * (platformWidth + gap) - 200, this.canvas.height - 500, platformWidth, 20, 500));
    // the circular ones
    this.addGameObject(new MovingPlatform(platformWidth-gap, this.canvas.height - 400, platformWidth, 20, 300, "circular", "up"));
    this.addGameObject(new MovingPlatform(platformWidth - gap +520, -100, platformWidth, 20, 300, "circular", "left", true));

    // secret platform
    this.addGameObject(new Platform(4 * (platformWidth + gap), this.canvas.height - 1000, platformWidth + 180, 20));

    // end platform
    this.addGameObject(new Platform(platformWidth - gap - 180, -500, platformWidth + 180, 20));

    // end collectibles platform
    this.addGameObject(new Platform(platformWidth - gap - 180, -1000, platformWidth + 180, 20));
    

    // Create enemies and add them to the game
    // Temporarily and maybe completely disabling enemies
    this.addGameObject(new Enemy(platformWidth + gap, this.canvas.height - 150, 330));
    //this.addGameObject(new Enemy(4 * (platformWidth + gap) - 200, this.canvas.height - 600), 200);
    //this.addGameObject(new Enemy(platformWidth + gap + 50, this.canvas.height - 90));
    //this.addGameObject(new Enemy(2 * (platformWidth + gap) + 50, this.canvas.height - 90));

    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(platformWidth + gap + gap + 52.5, this.canvas.height + 60, 15, 15));
    this.addGameObject(new Collectible(platformWidth + gap + gap + 52 - 15, this.canvas.height - 190, 15, 15));
    this.addGameObject(new Collectible(platformWidth + gap + 102.5, this.canvas.height - 440, 15, 15));
    this.addGameObject(new Collectible(4 * (platformWidth + gap) + (platformWidth + 180) / 2, this.canvas.height - 1020, 15, 15));
    this.addGameObject(new Collectible(platformWidth - gap, -520, 15, 15));

  }
  
}

// Export the Level class as the default export of this module
export default Level;
