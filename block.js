class Block {

    constructor (size, color, pos, vel={ x: 0, y: 0 }, outline=150) {
        this.size = size;
        this.color = color;
        this.outline = outline;
        this.pos = pos;
        this.prevPos = this.pos;
        this.vel = vel;
    }

    // returns 0 if a left-right collision, 1 if a top-bottom collision, and -1 if not a collision
    collide (square) {
        // calculate sides
        
        let left   = this.pos.x - this.size/2;
        let right  = this.pos.x + this.size/2;
        let top    = this.pos.y - this.size/2;
        let bottom = this.pos.y + this.size/2;

        let squareLeft   = square.pos.x - square.size/2;
        let squareRight  = square.pos.x + square.size/2;
        let squareTop    = square.pos.y - square.size/2;
        let squareBottom = square.pos.y + square.size/2;

        // are they even colliding?
        if (!(((right >= squareLeft && right <= squareRight) || (left >= squareLeft && left <= squareRight)) && 
              ((bottom >= squareTop && bottom <= squareBottom) || (top >= squareTop && top <= squareBottom)))) 
            return -1;
        
        // active edges: [left/right, top/bottom]
        let edges = [this.vel.x > 0, this.vel.y > 0];
        let squareEdges = [!edges[0], !edges[1]];

        // distances
        let dX = abs((squareEdges[0] ? squareRight : squareLeft) - (edges[0] ? right : left));
        let dY = abs((squareEdges[1] ? squareBottom : squareTop) - (edges[1] ? bottom : top));

        // time for distances
        let tX = dX / this.vel.x;
        let tY = dY / this.vel.y;

        // greator time is colliding longer
        return (tX > tY) ? 0 : 1;
    }

    updatePos (reactives, grav) {
        this.prevPos = this.pos;

        // collision detection
        for (let react of reactives) {
            switch (this.collide(react)) {
                case 0:  // left-right collision
                    this.vel.x = -this.vel.x;
                    break;
                case 1:  // top-bottom collision
                    this.vel.y = (this.vel.y > 0) ? -react.elasticity : react.elasticity;
                    break;
            }
        }

        // left and right extremities
        if (this.pos.x - this.size/2 < 0 || this.pos.x + this.size/2 > width)
            this.vel.x = -this.vel.x;

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.vel.y += grav;

        // past bottom
        return (this.pos.y - this.size/2 > height) ? true : false;
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
