//import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from "../engine/physics.js";
import Platform from "./platform.js";
import GameObject from '../engine/gameobject.js';

//class MovingPlatform extends Platform {
    class MovingPlatform extends GameObject {
    constructor(x, y, width, height, color = 'gray') {
        //super(x, y, width, height, color);
   
        super(x, y);
        this.width = width;
        this.height = height;


        this.addComponent(new Renderer(color, width, height));

        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
    
        this.movementDistance = 0;
        this.movementLimit = 200;
        this.movingUp = true;
    }

    update(deltaTime) {
        const physics = this.getComponent(Physics);
        
        console.log(physics.gravity.y);

        if (this.movingUp) {
            // If it hasn't reached its movement limit, make it move right
            if (this.movementDistance < this.movementLimit) {
              physics.gravity.y = 200;
              this.movementDistance += Math.abs(physics.gravity.y) * deltaTime;
            } else {
              // If it reached the limit, make it move left
              this.movingUp = false;
              this.movementDistance = 0;
            }
          } 
          else {
            // If it hasn't reached its movement limit, make it move left
            if (this.movementDistance < this.movementLimit) {
              physics.gravity.y = -200;
              this.movementDistance += Math.abs(physics.gravity.y) * deltaTime;
            } else {
              // If it reached the limit, make it move right
              this.movingUp = true;
              this.movementDistance = 0;
            }
          }
    }
}

export default MovingPlatform;