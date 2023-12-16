// Import the necessary classes from the 'engine' directory
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';

// Define a new class, Platform, which extends (inherits from) GameObject
class Platform extends GameObject {
  
  // Define the constructor for the Platform class. It takes arguments for the x and y coordinates,
  // width, height, and color (with a default value of 'gray' if no color is provided)
  constructor(x, y, width, height, color = 'gray') {
    
    // Call the constructor of the superclass (GameObject) with the x and y coordinates
    super(x, y);
    //this.movingType = movingType;
    //this.xv = 0;
    //this.yv = 0;

    //if (this.movingType == 'vertical') {
      //this.yv = 75;  
    //}

    //console.log(this.yv);
    
    // Add a Renderer component to this platform with the specified color, width, and height.
    // The Renderer component is responsible for rendering the platform on the canvas
    this.addComponent(new Renderer(color, width, height));
    
    // Add a Physics component to this platform, with initial velocity, acceleration, and forces set to zero.
    // Since platforms don't move, these values will remain zero throughout the game
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0}));
    
    //console.log(this.yv);

    // Set the tag property to 'platform'. This can be used to identify platforms later in the game logic
    this.tag = 'platform';
    
    //this.movementDistance = 0;
    //this.movementLimit = 200;
    //this.movingOG = true;
  }

  /*update(deltaTime) {
    const physics = this.getComponent(Physics);

    //physics.velocity.y = -75;

    //if (this.movingType !== null) {
      if (this.movingType === 'vertical') {
        console.log(physics.velocity.y);
        if (this.movingOG) {
          // If it hasn't reached its movement limit, make it move right
          if (this.movementDistance < this.movementLimit) {
            physics.velocity.y = 75;
            this.movementDistance += Math.abs(physics.velocity.y) * deltaTime;
          } else {
            // If it reached the limit, make it move left
            this.movingOG = false;
            this.movementDistance = 0;
          }
        } 
        else {
          // If it hasn't reached its movement limit, make it move left
          if (this.movementDistance < this.movementLimit) {
            physics.velocity.y = -75;
            this.movementDistance += Math.abs(physics.velocity.y) * deltaTime;
          } else {
            // If it reached the limit, make it move right
            this.movingOG = true;
            this.movementDistance = 0;
          }
        }
      }
    //}
    //else if (this.movingType == 'circular') {

    }
  }*/

}

// Export the Platform class as the default export of this module
export default Platform;
