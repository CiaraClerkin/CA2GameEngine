import UI from './ui.js';

class GameText extends UI {
    //thanks bob, pretty much entirely
    constructor(text, x, y, font, color, textAlign = 'left', textBaseline = 'top') {
        super(text, x, y, textAlign, textBaseline);
        this.font = font;
        this.color = color;
    }
    
    setText(newText) {
        this.text = newText;
    }
    
    draw(ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;
        ctx.fillText(this.text, this.x, this.y);
    }
}

export default GameText;