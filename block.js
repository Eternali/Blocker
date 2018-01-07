class Block {

    constructor (size, color, pos) {
        this.size = size;
        this.color = color;
        this.pos = pos;
        this.prevPos = this.pos;
    }

    // returns 0 if a left-right collision, 1 if a top-bottom collision, and -1 if not a collision
    collide (square) {
        left = this.prevPos + this.size/2 < square.pos + square.size/2;
        right = false;
        top = false;
        bottom = false;


    }

}
