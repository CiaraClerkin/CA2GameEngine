// Importing necessary components and resources
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Input from '../engine/input.js';
import { Images } from '../engine/resources.js';
import Enemy from './enemy.js';
import Platform from './platform.js';
import MovingPlatform from './movingPlatform.js';
import Collectible from './collectible.js';
import ParticleSystem from '../engine/particleSystem.js';
import Ladder from './ladder.js';

// Defining a class Player that extends GameObject
class Player extends GameObject {
  // Constructor initializes the game object and add necessary components
  constructor(x, y) {
    super(x, y); // Call parent's constructor
    this.renderer = new Renderer('blue', 50, 50, Images.player); // Add renderer
    this.addComponent(this.renderer);
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 })); // Add physics
    this.addComponent(new Input()); // Add input for handling user input
    // Initialize all the player specific properties
    this.direction = 1;
    this.lives = 3;
    this.score = 0;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpForce = 350;
    this.jumpTime = 0.3;
    this.jumpTimer = 0;
    this.speed = 150;
    this.isInvulnerable = false;
    this.isGamepadMovement = false;
    this.isGamepadJump = false;
    //for teleporting after collectibles, so player can move after teleport
    this.allFirst = true;
  }

  // The update function runs every frame and contains game logic
  update(deltaTime) {
    const physics = this.getComponent(Physics); // Get physics component
    const input = this.getComponent(Input); // Get input component

    // Climbing the ladder
    // Sees if player makes contact with ladder, then player can move up or down
    // minor issue when jumping on top of ladder
    const ladders = this.game.gameObjects.filter((obj) => obj instanceof Ladder);
    for (const ladder of ladders) {
      if (physics.isColliding(ladder.getComponent(Physics))) {
        //thanks Bob
        //fix gamepad later
        if (input.isKeyDown('ArrowUp')) {
          physics.velocity.y = -this.speed;
        } 
        else if (input.isKeyDown('ArrowDown')) {
          physics.velocity.y = this.speed;
        }
        else {
          //so the player doesn't fall
          physics.velocity.y = 0;
          physics.gravity.y = 0;
        }
      }
      else {
        //gravity is returned when player is no longer touching ladder
        //which avoids having the player ascend to the heavens
        physics.gravity.y = 400;
      }
    }

    this.handleGamepadInput(input);
    
    // Handle player movement
    if (!this.isGamepadMovement && input.isKeyDown('ArrowRight')) {
      physics.velocity.x = this.speed;
      this.direction = -1;
    } else if (!this.isGamepadMovement && input.isKeyDown('ArrowLeft')) {
      physics.velocity.x = -this.speed;
      this.direction = 1;
    } else if (!this.isGamepadMovement) {
      physics.velocity.x = 0;
    }
    
    // Handle player jumping
    if (!this.isGamepadJump && input.isKeyDown('ArrowUp') && this.isOnPlatform) {
      this.startJump();
    }

    if (this.isJumping) {
      this.updateJump(deltaTime);
    }

    // Handle collisions with collectibles
    const collectibles = this.game.gameObjects.filter((obj) => obj instanceof Collectible);
    for (const collectible of collectibles) {
      if (physics.isColliding(collectible.getComponent(Physics))) {
        this.collect(collectible);
        this.game.removeGameObject(collectible);
      }
    }
  
    // Handle collisions with enemies
    const enemies = this.game.gameObjects.filter((obj) => obj instanceof Enemy);
    for (const enemy of enemies) {
      if (physics.isColliding(enemy.getComponent(Physics))) {
        this.collidedWithEnemy();
      }
    }
  
    // Handle collisions with platforms
    this.isOnPlatform = false;  // Reset this before checking collisions with platforms
    const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform);
    for (const platform of platforms) {
      if (physics.isColliding(platform.getComponent(Physics))) {
        if (!this.isJumping) {
          physics.velocity.y = 0;
          physics.acceleration.y = 0;
          this.y = platform.y - this.renderer.height;
          this.isOnPlatform = true;
        }
      }
    }

    // Some testing only to come to a solution that I thought about but didn't do for some reason
    // Also this seems to not work in movingPlatform update for some reason
    const movingPlatforms = this.game.gameObjects.filter((obj) => obj instanceof MovingPlatform);
    for (const movingPlatform of movingPlatforms) {
      const physics = movingPlatform.getComponent(Physics);
      physics.gravity.y = 0;
      if (movingPlatform.direction == "up") {
          // If it hasn't reached its movement limit, make it move right
          if (movingPlatform.movementDistance < movingPlatform.movementLimit) {
            physics.velocity.x = 0;
            physics.velocity.y = -100;
            movingPlatform.movementDistance += Math.abs(physics.velocity.y) * deltaTime;
            //console.log(movingPlatform.movementDistance);
          } else {
            //console.log("Hello");
            // If it reached the limit, make it move left
            movingPlatform.movementDistance = 0;
            if (movingPlatform.clockwise) {
              movingPlatform.direction = "right";
            }
            else {
              movingPlatform.direction = "left";
            }
          }
      }
      else if (movingPlatform.direction == "left") {
        if (movingPlatform.movementType === "circular") {
          if (movingPlatform.movementDistance < movingPlatform.movementLimit) {
            console.log("HI");
            physics.velocity.y = 0;
            physics.velocity.x = -100;
            //this.movingPlatformPhysics(-100);
            /*if (this.physics.isColliding(movingPlatform.getComponent(Physics))) {
              this.physics.velocity.x = -100;
            }*/
            movingPlatform.movementDistance += Math.abs(physics.velocity.x) * deltaTime;
          }
          else {
            movingPlatform.movementDistance = 0;
            if (movingPlatform.clockwise) {
              movingPlatform.direction = "up";
            }
            else {
              movingPlatform.direction = "down";
            }
          }
        }
        else {
          movingPlatform.direction = "down";
        }    
      } 
      else if (movingPlatform.direction == "down") {
          // If it hasn't reached its movement limit, make it move left
          if (movingPlatform.movementDistance < movingPlatform.movementLimit) {
              physics.velocity.x = 0;
              physics.velocity.y = 100;
              /*if (this.physics.isColliding(physics)) {
                this.physics.velocity.x = 100;
              }*/
              movingPlatform.movementDistance += Math.abs(physics.velocity.y) * deltaTime;
          } else {
              // If it reached the limit, make it move right
              movingPlatform.movementDistance = 0;
              if (movingPlatform.clockwise) {
                movingPlatform.direction = "left";
              }
              else {
                movingPlatform.direction = "right";
              }
          }
      }
      else if (movingPlatform.direction == "right") {
        if (movingPlatform.movementType === "circular") {
          if (movingPlatform.movementDistance < movingPlatform.movementLimit) {
            physics.velocity.y = 0;
            physics.velocity.x = 100;
            //this.movingPlatformPhysics(100);
            movingPlatform.movementDistance += Math.abs(physics.velocity.x) * deltaTime;
          }
          else {
            movingPlatform.movementDistance = 0;
            if (movingPlatform.clockwise) {
              movingPlatform.direction = "down";
            }
            else {
              movingPlatform.direction = "up";    
            }
          }
        }
        else {
          movingPlatform.direction = "up";
        }
      }
    }
  
    // Check if player has fallen off the bottom of the screen
    if (this.y > this.game.canvas.height + 300) {
      this.resetPlayerState();
    }

    // Check if player has no lives left
    if (this.lives <= 0) {
      location.reload();
    }

    // Check if player has collected all collectibles
    if (this.score >= 5 && this.allFirst) {
      console.log('You win!');
      // teleport to win location instead
      this.x = -20;
      this.y = -1150;
      this.allFirst = false;
      //location.reload();
    }

    super.update(deltaTime);
  }

  movingPlatformPhysics(velocity) {
    const physics = this.getComponent(Physics);
    const movingPlatforms = this.game.gameObjects.filter((obj) => obj instanceof MovingPlatform);
    
    for (const movingPlatform of movingPlatforms) {
      if (physics.isColliding(movingPlatform.getComponent(Physics))) {
        physics.velocity.x = velocity;
      }
    }
  }

  handleGamepadInput(input){
    const gamepad = input.getGamepad(); // Get the gamepad input
    const physics = this.getComponent(Physics); // Get physics component
    if (gamepad) {
      // Reset the gamepad flags
      this.isGamepadMovement = false;
      this.isGamepadJump = false;

      // Handle movement
      const horizontalAxis = gamepad.axes[0];
      // Move right
      if (horizontalAxis > 0.1) {
        this.isGamepadMovement = true;
        physics.velocity.x = this.speed;
        this.direction = -1;
      } 
      // Move left
      else if (horizontalAxis < -0.1) {
        this.isGamepadMovement = true;
        physics.velocity.x = -this.speed;
        this.direction = 1;
      } 
      // Stop
      else {
        physics.velocity.x = 0;
      }
      
      // Handle jump, using gamepad button 0 (typically the 'A' button on most gamepads)
      if (input.isGamepadButtonDown(0) && this.isOnPlatform) {
        this.isGamepadJump = true;
        this.startJump();
      }
    }
  }

  startJump() {
    // Initiate a jump if the player is on a platform
    if (this.isOnPlatform) { 
      this.isJumping = true;
      this.jumpTimer = this.jumpTime;
      this.getComponent(Physics).velocity.y = -this.jumpForce;
      this.isOnPlatform = false;
    }
  }
  
  updateJump(deltaTime) {
    // Updates the jump progress over time
    this.jumpTimer -= deltaTime;
    if (this.jumpTimer <= 0 || this.getComponent(Physics).velocity.y > 0) {
      this.isJumping = false;
    }
  }

  collidedWithEnemy() {
    // Checks collision with an enemy and reduce player's life if not invulnerable
    if (!this.isInvulnerable) {
      this.lives--;
      this.isInvulnerable = true;
      // Make player vulnerable again after 2 seconds
      setTimeout(() => {
        this.isInvulnerable = false;
      }, 2000);
    }
  }

  collect(collectible) {
    // Handle collectible pickup
    this.score += collectible.value;
    console.log(`Score: ${this.score}`);
    this.emitCollectParticles(collectible);
  }

  emitCollectParticles() {
    // Create a particle system at the player's position when a collectible is collected
    const particleSystem = new ParticleSystem(this.x, this.y, 'yellow', 20, 1, 0.5);
    this.game.addGameObject(particleSystem);
  }

  resetPlayerState() {
    // Reset the player's state, repositioning it and nullifying movement
    this.x = 0;
    this.y = this.game.canvas.height / 2;
    this.getComponent(Physics).velocity = { x: 0, y: 0 };
    this.getComponent(Physics).acceleration = { x: 0, y: 0 };
    this.direction = 1;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpTimer = 0;
  }

  resetGame() {
    // Reset the game state, which includes the player's state
    this.lives = 3;
    this.score = 0;
    this.resetPlayerState();
  }
}

export default Player;
