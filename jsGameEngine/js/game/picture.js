import GameObject from "../engine/gameobject.js";
import Renderer from "../engine/renderer.js";

class Picture extends GameObject {
    // very easy, thanks bob
    constructor(x, y, width, height, image) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.image = image;
        this.addComponent(new Renderer("purple", width, height, image));
    }
}

export default Picture;