//import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from "../engine/physics.js";
import Platform from "./platform.js";
import GameObject from '../engine/gameobject.js';

class MovingPlatform extends Platform {
    //class MovingPlatform extends GameObject {
    constructor(x, y, width, height, movementLimit, movementType, direction, clockwise, color = '#c2c3c4') {
        super(x, y, width, height, color);
   
        //super(x, y);
        //this.width = width;
        //this.height = height;

        this.movementLimit = movementLimit;
        this.movementType = movementType;

        this.addComponent(new Renderer(color, width, height));

        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, {x: 0, y: 0}));

        this.movementDistance = 0;
        //this.movingUp = true;
        //this.movingLeft = true;

        //changed to string for simplicity of movement
        //also inputted now
        if (direction == null) {
            this.direction = "up";
        }
        else {
            this.direction = direction;
        }

        this.clockwise = clockwise;
    }

    /*update(deltaTime) {
        const physics = this.getComponent(Physics);
        
        //console.log(this.movementDistance);

        if (this.movingUp) {
            // If it hasn't reached its movement limit, make it move right
            if (this.movementDistance < this.movementLimit) {
              physics.velocity.y = -50;
              this.movementDistance += Math.abs(physics.velocity.y) * deltaTime;
            } else {
              // If it reached the limit, make it move left
              this.movingUp = false;
              this.movementDistance = 0;
            }
        } 
        else {
            // If it hasn't reached its movement limit, make it move left
            if (this.movementDistance < this.movementLimit) {
                physics.velocity.y = 50;
                this.movementDistance += Math.abs(physics.velocity.y) * deltaTime;
            } else {
                // If it reached the limit, make it move right
                this.movingUp = true;
                this.movementDistance = 0;
            }
        }
    }*/
}

export default MovingPlatform;