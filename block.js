class Block {

    constructor (size, color, pos, outline=150) {
        this.size = size;
        this.color = color;
        this.outline = outline;
        this.pos = pos;
        this.prevPos = this.pos;
        this.vel = { x: 0, y: 0 };
    }

    // returns 0 if a left-right collision, 1 if a top-bottom collision, and -1 if not a collision
    collide (square) {
        
        // calculate sides
        
        left   = this.pos.x - this.size/2;
        right  = this.pos.x + this.size/2;
        top    = this.pos.y - this.size/2;
        bottom = this.pos.y + this.size/2;
        
        oldLeft   = this.prevPos.x - this.size/2;
        oldRight  = this.prevPos.x + this.size/2;
        oldTop    = this.prevPos.y - this.size/2;
        oldBottom = this.prevPos.y + this.size/2;

        squareLeft   = square.pos.x - square.size/2;
        squareRight  = square.pos.x + square.size/2;
        squareTop    = square.pos.y - square.size/2;
        squareBottom = square.pos.y + square.size/2;

        // collisions
        isLeft = oldRight < squareLeft && right >= squareLeft;
        isRight = oldLeft >= squareRight && left < squareRight;
        isTop = oldBottom < squareTop && bottom >= squareTop;
        isBottom = oldTop >= squareBottom && top < squareBottom;

        if (isLeft || isRight) return 0;
        else if (isTop || isBottom) return 1;
        else return -1; 
    }

    updatePos (blocks, gravity) {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.vel.y += gravity;

        // collision detection
        for (b of blocks) {
            switch (this.collide(b)) {
                case 0:  // left-right collision
                    this.vel.x = -this.vel.x;
                    break;
                case 1:  // top-bottom collision
                    this.vel.y = -this.vel.y;
                    break;
            }
        }
    }

    draw () {
        push();
        translate(this.pos.x, this.pos.y);
        stroke(this.outline);
        fill(this.color);
        rect(0, 0, this.size, this.size);
        pop();
    }

}
