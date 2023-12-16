import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';

class Ladder extends GameObject {
    constructor(x, y, height) {
        super(x, y);
        this.width = 50;
        this.addComponent(new Renderer('green', 50, height));
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
        this.tag = 'ladder';
    }
}

export default Ladder;